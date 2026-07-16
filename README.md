# niteshbhargv.github.io

Personal site — CV and writing. React + Vite + TypeScript, deployed to GitHub Pages
on push to `main`.

```sh
npm install
npm run dev
```

## Adding a post

Drop a markdown file in `src/content/posts/`. The filename is the URL slug, so
`my-post.md` is served at `/blog/my-post`. Frontmatter:

```markdown
---
title: "The title"
date: 2025-08-23
readTime: 14 min read
tags: [Tag, Another]
---

Body goes here.
```

Posts are sorted by `date`, newest first, so `date` must stay `YYYY-MM-DD`.

## Drafts

Unfinished writing goes in `src/content/drafts/`, which is never imported and so
never reaches the browser. Publish by moving the file into `src/content/posts/`.

Keep drafts out of `posts/`: anything in there is bundled and publicly readable
even if the page doesn't link to it.
