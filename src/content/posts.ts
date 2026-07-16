export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string;
}

// Only ./posts is globbed. Unfinished writing lives in ./drafts, which is never
// imported — a runtime `draft` flag would still ship the text inside the bundle
// for anyone to read. Publishing a draft means moving the file into ./posts.
const files = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parse(raw: string, slug: string): Post {
  const match = raw.match(FRONTMATTER);
  if (!match) throw new Error(`Post "${slug}" is missing frontmatter.`);

  const fields: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    fields[line.slice(0, sep).trim()] = line.slice(sep + 1).trim();
  }

  const tags = fields.tags
    ? fields.tags
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(unquote)
        .filter(Boolean)
    : [];

  return {
    slug,
    title: unquote(fields.title ?? slug),
    date: unquote(fields.date ?? ''),
    readTime: unquote(fields.readTime ?? ''),
    tags,
    body: raw.slice(match[0].length).trim(),
  };
}

/** Published posts, newest first. */
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(raw, path.replace(/^\.\/posts\//, '').replace(/\.md$/, '')))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): Post | undefined =>
  posts.find((post) => post.slug === slug);

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
