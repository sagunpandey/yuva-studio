import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const workspaceRoot = process.cwd();
const blogsDir = path.join(workspaceRoot, 'src', 'assets', 'blogs');
const indexPath = path.join(blogsDir, 'index.json');
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
    if (!trimmed || !trimmed.includes(':')) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split(':');
    const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');

    if (key.trim() === 'tags') {
      metadata.tags = value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      continue;
    }

    metadata[key.trim()] = value;
  }

  return { metadata, body: match[2] };
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function extractExcerpt(content) {
  const paragraph = content
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk && !chunk.startsWith('#'));

  const excerpt = paragraph ?? content.trim();
  return excerpt.slice(0, 180) + (excerpt.length > 180 ? '...' : '');
}

function normalizeDate(dateValue) {
  if (!dateValue) {
    return '1970-01-01';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return '1970-01-01';
  }

  return date.toISOString().slice(0, 10);
}

async function generateIndex() {
  const files = await fs.readdir(blogsDir, { withFileTypes: true });
  const markdownFiles = files
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
    .filter((entry) => entry.name.toLowerCase() !== 'readme.md')
    .map((entry) => entry.name);

  const entries = [];

  for (const file of markdownFiles) {
    const filePath = path.join(blogsDir, file);
    const markdown = await fs.readFile(filePath, 'utf8');
    const { metadata, body } = parseFrontmatter(markdown);

    const slug = file.replace(/\.md$/i, '');
    entries.push({
      slug,
      file,
      title: metadata.title || slugToTitle(slug),
      date: normalizeDate(metadata.date),
      category: metadata.category || 'software-engineering',
      excerpt: metadata.excerpt || extractExcerpt(body),
      author: metadata.author || 'Sagun Pandey',
      tags: Array.isArray(metadata.tags) ? metadata.tags : []
    });
  }

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return entries;
}

async function main() {
  const generatedEntries = await generateIndex();
  const output = JSON.stringify(generatedEntries, null, 2) + '\n';

  if (checkMode) {
    let existing = '';
    try {
      existing = await fs.readFile(indexPath, 'utf8');
    } catch {
      existing = '';
    }

    if (existing !== output) {
      console.error('Blog index is out of date. Run `npm run blog:index`.');
      process.exitCode = 1;
      return;
    }

    console.log('Blog index is up to date.');
    return;
  }

  await fs.writeFile(indexPath, output, 'utf8');
  console.log(`Generated ${generatedEntries.length} entries in src/assets/blogs/index.json`);
}

main().catch((error) => {
  console.error('Failed to generate blog index:', error);
  process.exitCode = 1;
});
