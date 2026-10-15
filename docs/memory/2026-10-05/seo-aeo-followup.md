# SEO / AEO follow-up audit

**Date:** 2026-10-05
**Session:** Read-only audit remaining SEO/AEO improvements

## What happened
Verified109/109 sitemap URLs again without verifier errors. Ran3 Lighthouse mobile lab tests: homepage63 twice, definition article57 performance; SEO100 on both full tests. No production changes.

## Decision / Fix / Discovery
Full report: [SEO/AEO audit](../../audits/2026-10-05-seo-aeo-followup.md).
- Homepage LCP6.6/7.4s; article7.3s, TBT0/CLS0. Text is LCP candidate; profile fonts/CSS/auth before attributing root cause. Lighthouse not field CWV.
- Tag archives54, of which42 have1 article; recommend selective consolidation/index policy, not blanket deletion.
-5 personal Article authors are Organization instead of Person; all42 Article schemas omit image. Person author/profile and real relevant images are improvements, not invalid-schema proof.
- Q&A initial HTML loading state, detail metadata reads demoPosts, real DB questions not in sitemap; recommend published-only SSR/meta/sitemap after scoped implementation approval.
- Hoi-dap2 FAQ schema entries not visible. FAQ rich results ceased May7,2026 per current official Google changelog; don't chase deprecated feature.
- OpenRouter static page still makes overbroad local-data/no-auto-charge claims; official OpenRouter search confirms optional auto-top-up. Highest content correction priority, no edit yet.
- www still404 after user reports DNS configuration; mapping/redirect not changed. GSC/index/ranking untested.

## Lesson
A clean SEO checklist doesn't test semantic truth, Q&A coverage, or mobile speed. Audit rendered content/entity types and real app data separately; no special AI file/schema guarantees citations.
