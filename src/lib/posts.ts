// Loader bài viết MDX tại build-time (server-only, tương thích static export).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), 'src', 'content');
const batDauDir = path.join(process.cwd(), 'src', 'content', 'bat-dau');

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title as string,
        description: data.description as string,
        datePublished: data.datePublished as string,
        dateModified: data.dateModified as string | undefined,
        authorName: data.authorName as string,
        tags: (data.tags as string[]) ?? [],
      } as PostMeta;
    })
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    datePublished: data.datePublished as string,
    dateModified: data.dateModified as string | undefined,
    authorName: data.authorName as string,
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

// Loader riêng cho bài trong khu "Bắt đầu" (/bat-dau) - đọc thư mục con bat-dau/.
export function getBatDauPostBySlug(slug: string): Post | null {
  const file = path.join(batDauDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    datePublished: data.datePublished as string,
    dateModified: data.dateModified as string | undefined,
    authorName: data.authorName as string,
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getBatDauSlugs(): string[] {
  if (!fs.existsSync(batDauDir)) return [];
  return fs
    .readdirSync(batDauDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export interface TocItem {
  level: 2 | 3;
  text: string;
  slug: string;
}

// Trích xuất mục lục (h2/h3) từ nội dung markdown. Slug được sinh bằng
// github-slugger - khớp 1:1 với id mà rehype-slug gán cho heading khi render.
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of content.split('\n')) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = (m[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = m[2].replace(/[*_`]/g, '').trim();
    if (!text) continue;
    items.push({ level, text, slug: slugger.slug(text) });
  }
  return items;
}
