# CongDongAI editorial B - implementation contract

**Date:** 2026-10-07
**Base:** 53cd84f (remote main verified)
**Approval:** User selected `Ok B`; implement and release visual. No rules/data/worker permissions.

## Visual
Reference `approved-B.html`: exact paper#F8F5EF, card#FFFDF8, ink#292C25, muted#62645B, green#38513B, cream#ECE3CF, line#D7D4C9. Noto Serif/Sans, container1180, desktop34/mobile20, no shadow/bounce, corners3-5, controls>=44px. Home order intro -> liveQ&A -> horizontal feature -> stories -> learning/library -> existing FAQ/fullletter in details.

## Production vs mockup
- Keep original letter content in expandable details, not shortened mockup.
- Q&A consumes existing Firestore client; preserve real loading/error/empty, never introduce mock questions or fallback to fake live data.
- Feature/story uses actual caseStudies/blog loaders and exact authors/source notes.
- Keep existing auth/JoinGoogleButton; no mock login or send-draft success. Submission backend not in release; replace contribution CTA with asking/participating that really exists.
- Preserve content/frontmatter, IDs/comment slugs, date/schema/metadata/sitemap, external source attribution.
- Desk illustration is original SVG from mockup, label illustration not screenshot.

## Coverage
- New composition: homepage.
- Shared full visual primitives: header/footer/font/palette/buttons/cards/reader.
- Reader templates updated: blog/[slug],bat-dau/[slug],huong-dan/[slug],cau-chuyen/[slug].
- Other21-template inventory routes keep current structure/logic with shared styling. Lists, Q&A, library, privacy/rules/admin not bespoke B redesign; explicitly report this, do not claim entire site pixel-identical.
- No new routes, API/schema/rules/data changes; old109 URL sitemap must still function.

## Verify / release
Build/test clean worktree; compare hashes in protected-baseline.json; check all sitemapURLs/H1/tag links/metadata and removed/mock strings; browser desktop1440/mobile390/320 for homepage + allfourreader styles + representative listing/Q&A/library. Keep authenticated UAT distinct from guest smoke. Stage named files only; verify remoteSHA and production rollout, update memory/vault.
