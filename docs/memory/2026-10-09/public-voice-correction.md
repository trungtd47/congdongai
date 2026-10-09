# Public personal voice correction

**Date:** 2026-10-09
**Session:** Owner rejected internal editorial language on public article

## What happened
Owner correctly rejected description beginning `Kinh nghiệm Đức Trung:` and repeated leakage of editorial instructions into public writing. Corrected description in first person and removed body statements narrating attribution, unmeasured benchmarks, catalogue uncertainty and internal price-pinning policy.

## Decision / Fix / Discovery
- Scope one MDX; preserve technical guidance, citations, authorName/byline/signature, title, dates and route. Not a wholesale rewrite or site redesign.
- New description begins `Mình dùng Claude Pro, ChatGPT Pro và OpenRouter trong Hermes` and explains the author's actual choice directly.
- Replace internal notes with useful reader-facing prose: model versions have different IDs, suggested delegation is introduced naturally, source section is `Tài liệu tham khảo`.
- Build139/139. Generated article HTML: oneH1, new description in standard/OG/Twitter3 meta fields, Blog card synchronized; banned internal phrases absent and author/Claude plugin retained.
- Updated congdongai-site skill to prohibit internal editorial caveats and third-person self-attribution across description/body/card/SEO.

## Lesson
Honest public writing does not require narrating the editing process; keep internal provenance/verification notes in handoff and let personal articles speak as the author.
