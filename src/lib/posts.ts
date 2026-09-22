// Loader bài viết MDX tại build-time (server-only, tương thích static export).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

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
