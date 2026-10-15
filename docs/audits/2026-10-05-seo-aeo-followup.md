# SEO / AEO follow-up audit - CongDongAI.org

Date: 2026-10-05. Scope: production public HTTP, rendered HTML, repository templates, Lighthouse simulated mobile. Read-only production audit; no source fix, DNS change, push or deployment.

## Verified baseline
- scripts/verify-seo.py production:109 sitemap URLs,109 verified, errors[].
- Current https://www.congdongai.org/ returns404. User has configured www DNS; this HTTP response does not establish which DNS setting is wrong or whether rollout is pending.

## Lighthouse mobile lab measurements
| Page/run | Performance | SEO | Accessibility | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage run1 |63|100|90|5.0s|6.6s|0ms|0|
| Homepage run2 |63|not run|not run|5.0s|7.4s|0ms|0|
| /bat-dau/hermes-agent-la-gi/ |57|100|96|4.8s|7.3s|0ms|0|

Lighthouse13.5.0, isolated headless Chrome, default simulated mobile. Not CrUX/Core Web Vitals field data; SEO100 is an automated checklist, not rankings or indexing.

Observations: homepage estimated unusedJS72KiB; auth iframe loaded initially (~95KB) and six font assets in dependency tree. LCP element is introductory text on homepage, H1 on article. Prioritize profiling fonts/CSS/preload plus auth loading; these are candidates, not proven root causes. Do not assume hero image compression solves text LCP. Auth external cache lifetime cannot be changed by this repo.
Accessibility: heading-order skips on homepage, low contrast small text, body links distinguished only by color. Fix heading semantics/styles without redesign or rewriting homepage letter.

## Findings and suggested priority
1. **High - misleading OpenRouter copy.** /bat-dau/vi-sao-dung-openrouter/ visible comparison says data stays on user machine; does not disclose model-cloud processing. Visible and FAQ schema say no automatic charging. Official OpenRouter FAQ and terms support optional auto top-up/recharge. Clarify local agent versus remote model and auto top-up settings. No editorial change made.
2. **High - incomplete Q&A SEO surface.** /hoi-dap/ public initial HTML contains loading state rather than posts. Detail template builds metadata from demoPosts, not current real questions; real question fallback is generic title/description. Public sitemap does not include real DB questions. Recommend SSR/server read of published questions/answers, per-question metadata, published-only sitemap, proper missing404 and QAPage only for actual visible eligible content. This is a technical coverage finding; no claim Google cannot render JS or that user questions are currently unindexed. Auth/DB changes require explicit scope.
3. **Medium - author entity wrong.**42 Article schemas:37 Cộng Đồng AI Organization,5 Đức Trung Organization. Personal author should be Person, organization stays Organization. Prefer real public author bio URL; don't invent profile facts.42/42 Article schemas lack image; add relevant actual visible article images where available, not claim this invalidates schema. All42 have datePublished.
4. **Medium - overly fragmented tag index.**54 tag URLs,42 contain1 unique article,10 contain2,1 contains4,1 contains5. Tags are useful navigation; do not delete them blindly or automatically label thin pages as spam. Consider merging synonymous tags; selectively noindex and remove weak generic single-post archives from sitemap while retaining user navigation. Keep differentiated useful hubs indexable; no universal minimum-post rule.
5. **Medium - FAQ markup not reflected visibly.** /hoi-dap/ has2 FAQ schema questions absent from main HTML; source confirms no matching static FAQ section. Remove obsolete FAQ schema or render accurate corresponding content. FAQ answer 'only pay model usage' oversimplifies subscriptions. Homepage exact-text match for one FAQ answer failed; needs semantic/normalized comparison before claiming mismatch there.
6. **Content/AEO improvement.** Existing article headers, TOC, practical steps and source links are foundations. Samples definition and security guide put preamble/TOC/visual before direct answer. Suggest short direct answer near top with conditions and source; preserve nuance, not keyword repetition.12/42 Article pages have no external HTTPS anchor in main; this is only a citation-review candidate count, not proof all12 need citations or have incorrect claims. Cite factual product/capability/cost/security claims at the point they appear, with editorial updated date only after real edits.
7. **Domain and measurement.** www404 needs App Hosting/domain mapping/redirect readback. GSC URL Inspection/Pages and field CWV remain untested; report separately from Lighthouse lab.

## AEO limits and official sources actually retrieved
- Google AI features guide states standard SEO applies, no special AI schema/files required; indexed/snippet eligible pages are prerequisites, inclusion not guaranteed. https://developers.google.com/search/docs/appearance/ai-features
- Google Article docs recommend appropriate Person/Organization author, article image and contextual author URL. https://developers.google.com/search/docs/appearance/structured-data/article
- Google JavaScript SEO docs: Google renders JS; SSR/prerender remains useful for users and crawlers that do not execute JS. https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- FAQ rich results ceased May7,2026; Google's current FAQ URL redirects to documentation changelog. Verified live changelog and official-domain search. Do not add FAQ schema to chase a deprecated rich-result feature; visible FAQ can remain useful. https://developers.google.com/search/updates
- OpenRouter official FAQ/support/terms search results confirm optional auto-top-up. Direct credits-guide HTML returned403; findings grounded in official-domain search, not invented successful extract. https://openrouter.ai/docs/faq ; https://openrouter.ai/terms
- web_extract backend unsupported; used direct HTTP for Google pages and web_search for official OpenRouter sources. No GSC access or AI-engine citation benchmark performed.

## Evidence storage
Raw scan and three Lighthouse JSON reports are in coder scratch directory; reports may contain public service configuration URLs and should not be delivered verbatim. This markdown contains sanitized verified results and lasting findings. Re-run measurements after any implementation and read back exact production targets.
