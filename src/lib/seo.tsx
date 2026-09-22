import type { ReactNode } from 'react';

// JSON-LD structured data (AEO). Render trong <head> qua component server.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cộng Đồng AI',
    url: 'https://congdongai.org',
    description:
      'Hub tiếng Việt dạy người dùng phổ thông cài và dùng Hermes Agent của Nous Research.',
    inLanguage: 'vi',
    publisher: {
      '@type': 'Organization',
      name: 'Cộng Đồng AI',
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://congdongai.org${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url: `https://congdongai.org/blog/${input.slug}/`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'vi',
    author: {
      '@type': 'Organization',
      name: input.authorName,
      url: 'https://congdongai.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cộng Đồng AI',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://congdongai.org/blog/${input.slug}/`,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function howToJsonLd(input: {
  name: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function jsonLdScript(data: Record<string, unknown>): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
