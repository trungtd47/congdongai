import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl, siteConfig } from "@/lib/site";

// JSON-LD structured data (AEO). Render trong <head> qua component server.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl("/")}#website`,
    name: siteConfig.name,
    url: canonicalUrl("/"),
    alternateName: ["Cộng Đồng AI", "CongDongAI.org"],
    description: siteConfig.description,
    inLanguage: "vi",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: canonicalUrl("/"),
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: canonicalUrl(input.path),
    ...(input.datePublished
      ? { datePublished: input.datePublished as string }
      : {}),
    ...(input.dateModified || input.datePublished
      ? { dateModified: (input.dateModified ?? input.datePublished) as string }
      : {}),
    inLanguage: "vi",
    author: {
      "@type": "Organization",
      name: input.authorName,
      url: canonicalUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: canonicalUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(input.path),
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function howToJsonLd(input: {
  name: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  absoluteTitle?: boolean;
}

// Metadata thống nhất cho mọi trang: title tự thêm thương hiệu (trừ khi
// absoluteTitle), OG/Twitter title+desc khớp với title/description, canonical
// dùng canonicalUrl, ảnh OG thật của site.
export function pageMetadata(input: PageMetadataInput): Metadata {
  const resolvedTitle = input.absoluteTitle
    ? input.title
    : `${input.title} | ${siteConfig.name}`;

  return {
    title: { absolute: resolvedTitle },
    description: input.description,
    alternates: { canonical: canonicalUrl(input.path) },
    openGraph: {
      type: input.type ?? "website",
      locale: siteConfig.locale,
      url: canonicalUrl(input.path),
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: input.description,
      ...(input.type === "article" && input.publishedTime
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime ?? input.publishedTime,
          }
        : {}),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: input.description,
      images: [siteConfig.ogImage],
    },
  };
}
