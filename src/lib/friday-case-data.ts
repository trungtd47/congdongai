// friday-case-data.ts
// Safe JSON loader for case study content from src/content/friday-cases/
// Only loads, never generates or modifies

import { CaseStudy, CaseBlock } from './case-studies';
import * as fs from 'fs/promises';
import * as path from 'path';

const FRIDAY_CASES_DIR = path.join(process.cwd(), 'src/content/friday-cases');

export async function loadFridayCaseStudies(): Promise<CaseStudy[]> {
  try {
    const entries = await fs.readdir(FRIDAY_CASES_DIR, { withFileTypes: true });
    const cases: CaseStudy[] = [];

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.json')) {
        try {
          const filePath = path.join(FRIDAY_CASES_DIR, entry.name);
          const content = await fs.readFile(filePath, 'utf-8');
          const caseData = JSON.parse(content) as CaseStudy;

          // Minimal validation
          if (!caseData.slug || !caseData.title || !caseData.sourceUrl) {
            console.warn(`[SKIP] Invalid case study: ${entry.name} missing required fields`);
            continue;
          }

          cases.push(caseData);
        } catch (err) {
          console.warn(`[WARN] Failed to load case study ${entry.name}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    }

    return cases;
  } catch (err) {
    console.warn(`[WARN] Could not read friday-cases directory: ${err instanceof Error ? err.message : String(err)}`);
    return [];
  }
}

// Merge Friday case studies with existing ones
export async function mergeFridayCases(existing: CaseStudy[]): Promise<CaseStudy[]> {
  const fridayCases = await loadFridayCaseStudies();
  
  // Dedupe by slug, Friday cases take priority if newer
  const merged = [...existing];
  const existingSlugs = new Set(existing.map(c => c.slug));

  for (const fridayCase of fridayCases) {
    if (!existingSlugs.has(fridayCase.slug)) {
      merged.push(fridayCase);
    } else {
      // Replace existing if sourceUrl differs (new source)
      const idx = merged.findIndex(c => c.slug === fridayCase.slug);
      if (idx >= 0 && merged[idx].sourceUrl !== fridayCase.sourceUrl) {
        merged[idx] = fridayCase;
      }
    }
  }

  return merged;
}
