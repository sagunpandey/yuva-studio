# Blog System Setup

This blog is database-less and Git-native. Posts live in markdown files, and `index.json` is the blog manifest used by the Angular app.

## How It Works

1. `src/assets/blogs/index.json` stores post metadata (slug, title, date, excerpt, etc.)
2. `BlogService` reads the manifest to render the blog list quickly
3. The post markdown file is fetched only when opening `/blog/:slug`
4. Frontmatter in markdown can override manifest metadata when needed

## File Structure

```text
src/assets/blogs/
|- index.json
|- building-scalable-architectures.md
|- the-art-of-clean-code.md
|- typescript-best-practices.md
```

## Manifest Format (`index.json`)

```json
[
  {
    "slug": "my-awesome-post",
    "file": "my-awesome-post.md",
    "title": "My Awesome Post",
    "date": "2026-03-01",
    "category": "software-engineering",
    "excerpt": "A short summary for the list page.",
    "author": "Sagun Pandey",
    "tags": ["angular", "markdown"]
  }
]
```

## Creating a New Blog Post

1. Create `src/assets/blogs/my-awesome-post.md`
2. Add optional frontmatter:

```markdown
---
title: My Awesome Post
date: 2026-03-01
category: software-engineering
excerpt: A short summary for the list page.
author: Sagun Pandey
tags: angular, markdown
---

# My Awesome Post

Write your post here.
```

3. Regenerate the manifest:

```bash
npm run blog:index
```

4. Validate there is no manifest drift (optional in CI):

```bash
npm run blog:index:check
```

5. Open `/blog` (list) or `/blog/my-awesome-post` (detail)

## Routes

- `/blog` - all posts from manifest
- `/blog/:slug` - a single markdown post

## Notes

- Keep slugs in kebab-case (`my-awesome-post`)
- Use `YYYY-MM-DD` dates for predictable sorting
- `src/assets/blogs/index.json` is generated from markdown metadata
- Run `npm run blog:index` after adding or editing posts
- `npm run build` auto-runs `npm run blog:index` via `prebuild`
- CI runs `npm run blog:index:check` to fail on stale manifest commits
- Markdown frontmatter is best for per-post overrides
