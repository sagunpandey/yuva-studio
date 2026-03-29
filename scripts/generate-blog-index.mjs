import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const workspaceRoot = process.cwd();
const blogsDir = path.join(workspaceRoot, 'src', 'assets', 'blogs');
const checkMode = process.argv.includes('--check');

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = normalized.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, body: normalized };
  }

  const metadata = {};
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(':')) continue;

    const [key, ...valueParts] = trimmed.split(':');
    const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');

    if (key.trim() === 'tags') {
      metadata.tags = value.split(',').map((tag) => tag.trim()).filter(Boolean);
      continue;
    }
    metadata[key.trim()] = value;
  }

  return { metadata, body: match[2] };
}

function slugToTitle(slug) {
  return slug.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function extractExcerpt(content) {
  const paragraph = content.split('\n\n').map((c) => c.trim()).find((c) => c && !c.startsWith('#'));
  const excerpt = paragraph ?? content.trim();
  return excerpt.slice(0, 180) + (excerpt.length > 180 ? '...' : '');
}

function normalizeDate(dateValue) {
  if (!dateValue) return '1970-01-01';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '1970-01-01';
  return date.toISOString().slice(0, 10);
}

async function generateIndexForCategory(categoryDir, categoryName) {
  let files;
  try {
    files = await fs.readdir(categoryDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const markdownFiles = files
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.md') && e.name.toLowerCase() !== 'readme.md')
    .map((e) => e.name);

  const entries = [];
  for (const file of markdownFiles) {
    const filePath = path.join(categoryDir, file);
    const markdown = await fs.readFile(filePath, 'utf8');
    const { metadata, body } = parseFrontmatter(markdown);
    const slug = file.replace(/\.md$/i, '');

    entries.push({
      slug,
      file,
      category: categoryName,
      title: metadata.title || slugToTitle(slug),
      date: normalizeDate(metadata.date),
      excerpt: metadata.excerpt || extractExcerpt(body),
      author: metadata.author || 'Sagun Pandey',
      tags: Array.isArray(metadata.tags) ? metadata.tags : []
    });
  }

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function main() {
  const topLevelEntries = await fs.readdir(blogsDir, { withFileTypes: true });
  const categoryDirs = topLevelEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  let anyDrift = false;

  for (const categoryName of categoryDirs) {
    const categoryDir = path.join(blogsDir, categoryName);
    const indexPath = path.join(categoryDir, 'index.json');
    const entries = await generateIndexForCategory(categoryDir, categoryName);

    if (entries.length === 0) continue;

    const output = JSON.stringify(entries, null, 2) + '\n';

    if (checkMode) {
      let existing = '';
      try { existing = await fs.readFile(indexPath, 'utf8'); } catch { existing = ''; }
      if (existing !== output) {
        console.error(`Blog index out of date for category: ${categoryName}. Run \`npm run blog:index\`.`);
        anyDrift = true;
      }
    } else {
      await fs.writeFile(indexPath, output, 'utf8');
      console.log(`Generated ${entries.length} entries in src/assets/blogs/${categoryName}/index.json`);
    }
  }

  if (checkMode) {
    if (anyDrift) { process.exitCode = 1; } else { console.log('All blog indexes are up to date.'); }
  }
}

main().catch((error) => {
  console.error('Failed to generate blog index:', error);
  process.exitCode = 1;
});
