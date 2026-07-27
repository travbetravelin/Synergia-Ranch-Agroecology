import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "blog" | "people" | "topic" | "place" | "event";

export type ContentMeta = {
  slug: string;
  title: string;
  type: ContentType;
  date?: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
  role?: string;
};

export type ContentItem = ContentMeta & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

const TYPE_DIRS: Record<ContentType, string> = {
  blog: "blog",
  people: "people",
  topic: "topics",
  place: "places",
  event: "events",
};

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getContentItems(type: ContentType): ContentItem[] {
  const dir = path.join(CONTENT_DIR, TYPE_DIRS[type]);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.match(/\.mdx?$/))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: slugify(file),
        title: data.title ?? slugify(file),
        type,
        date: data.date?.toString(),
        author: data.author,
        tags: data.tags,
        excerpt: data.excerpt,
        role: data.role,
        body: content,
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      return a.title.localeCompare(b.title);
    });
}

export function getContentItem(type: ContentType, slug: string): ContentItem | null {
  const dir = path.join(CONTENT_DIR, TYPE_DIRS[type]);
  const mdPath = path.join(dir, `${slug}.md`);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    type,
    date: data.date?.toString(),
    author: data.author,
    tags: data.tags,
    excerpt: data.excerpt,
    role: data.role,
    body: content,
  };
}

// Transform [[wikilinks]] into markdown links
export function resolveWikilinks(body: string): string {
  return body.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    const [slug, label] = inner.split("|").map((s: string) => s.trim());
    const displayLabel = label ?? slug;
    const href = `/graph/${slug.toLowerCase().replace(/\s+/g, "-")}`;
    return `[${displayLabel}](${href})`;
  });
}
