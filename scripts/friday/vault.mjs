// Vault utilities: read public Hermes knowledge from Obsidian vault
// Only reads notes with public:true frontmatter in HERMES_PUBLIC_KNOWLEDGE_DIR

import { promises as fs } from 'fs';
import path from 'path';

const DEFAULT_VAULT_DIR = process.env.HERMES_PUBLIC_KNOWLEDGE_DIR;

export async function loadPublicNotes(vaultDir = DEFAULT_VAULT_DIR) {
  const notes = [];

  if (!vaultDir) {
    console.warn('  [WARN] HERMES_PUBLIC_KNOWLEDGE_DIR not set — skipping vault');
    return notes;
  }

  try {
    const files = await fs.readdir(vaultDir, { recursive: true });
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
      try {
        const filePath = path.join(vaultDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Parse frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) continue;

        const frontmatter = frontmatterMatch[1];
        const isPublic = frontmatter.includes('public:') && frontmatter.includes('public: true');
        
        if (!isPublic) continue;

        // Extract body (after frontmatter)
        const body = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
        
        notes.push({
          file,
          title: path.basename(file, '.md'),
          body,
          source: `vault://${file}`,
        });
      } catch (err) {
        console.warn(`  [WARN] Failed to parse ${file}: ${err.message}`);
      }
    }

    console.log(`  ✓ Loaded ${notes.length} public vault notes`);
    return notes;
  } catch (err) {
    console.warn(`  [WARN] Failed to read vault: ${err.message}`);
    return notes;
  }
}

export function buildVaultCorpus(notes) {
  // Combine vault notes into searchable corpus
  return notes
    .map(n => `# ${n.title}\n\n${n.body}`)
    .join('\n\n---\n\n');
}

export function findRelevantNotes(notes, query, limit = 3) {
  // Simple keyword matching (parent can upgrade to embedding-based later)
  const keywords = query.toLowerCase().split(/\s+/);
  
  const scored = notes.map(note => {
    const text = `${note.title} ${note.body}`.toLowerCase();
    const score = keywords.filter(kw => text.includes(kw)).length;
    return { note, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.note);
}
