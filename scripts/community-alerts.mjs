#!/usr/bin/env node
// Báo tương tác thật trên congdongai.org về Discord (#bao-cao-hang-ngay).
// - Chỉ ĐỌC Firestore named DB "congdongai" (Admin SDK). Không sửa rules, không ghi DB.
// - Gom thành 1 bản tin mỗi lần chạy; không có gì mới thì im lặng.
// - Bỏ qua dữ liệu mẫu (uid u-*, ai-*), AI và chính admin.
// - Chỉ cập nhật state SAU khi Discord trả 200 và GET lại được tin nhắn.
//
// Env:  GOOGLE_APPLICATION_CREDENTIALS, DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID, ALERT_STATE_FILE
// Cờ:   --dry-run (in ra, không gửi, không ghi state)
//       --init    (đặt mốc = bây giờ, không gửi)
//       --since=ISO (ghi đè mốc, dùng để thử)
//       --include-seed (test: không lọc dữ liệu mẫu/admin)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://congdongai.org';
const OVERLAP_MS = 2 * 60 * 1000; // lùi mốc 2 phút, chống sót do độ trễ ghi; trùng thì dedupe bằng seen
const REMIND_AFTER_MS = 12 * 60 * 60 * 1000;
const MAX_SEEN = 600;
const MSG_LIMIT = 1900;
const MAX_MESSAGES = 3;

// ---------- hàm thuần (có test) ----------

export function isSeedUid(uid) {
  return !uid || /^(u|ai)-/.test(uid);
}

export function isRealActor(uid, adminUids) {
  return !isSeedUid(uid) && !adminUids.includes(uid);
}

export function parseAdminUids(yamlText) {
  const m = /CONGDONG_ADMIN_UIDS[\s\S]*?value:\s*"([^"]*)"/.exec(yamlText || '');
  return m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
}

export function articleUrl(slug, repoDir = REPO) {
  if (slug.startsWith('batdau-')) return `${SITE}/bat-dau/${slug.slice(7)}/`;
  if (slug.startsWith('huongdan-')) return `${SITE}/huong-dan/${slug.slice(9)}/`;
  if (fs.existsSync(path.join(repoDir, 'src/content', `${slug}.mdx`))) return `${SITE}/blog/${slug}/`;
  return `${SITE}/cau-chuyen/${slug}/`;
}

export function clean(text, max = 160) {
  const t = String(text ?? '')
    .replace(/[`*_~|>]/g, '')
    .replace(/@/g, '@\u200b')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function vnTime(d) {
  const p = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(d);
  return p;
}

// events: { questions, answers, comments, users, flags, reminders }
export function buildDigest(ev, now = new Date()) {
  const lines = [];
  const head = `**Cộng Đồng AI: có tương tác mới** (${vnTime(now)})`;
  const total = Object.values(ev).reduce((n, a) => n + a.length, 0);
  if (total === 0) return [];

  if (ev.questions.length) {
    lines.push(`\n**Câu hỏi mới (${ev.questions.length})** - cần mình vào trả lời`);
    for (const q of ev.questions) {
      lines.push(`- ${clean(q.authorName, 40)}: ${clean(q.title, 120)}`);
      lines.push(`  <${SITE}/hoi-dap/${q.id}/>`);
      if (q.body) lines.push(`  > ${clean(q.body, 200)}`);
    }
  }
  if (ev.answers.length) {
    lines.push(`\n**Trả lời mới (${ev.answers.length})**`);
    for (const a of ev.answers) {
      lines.push(`- ${clean(a.authorName, 40)} trả lời "${clean(a.postTitle, 90)}"`);
      lines.push(`  <${SITE}/hoi-dap/${a.postId}/>`);
      if (a.body) lines.push(`  > ${clean(a.body, 200)}`);
    }
  }
  if (ev.comments.length) {
    lines.push(`\n**Bình luận mới (${ev.comments.length})**`);
    for (const c of ev.comments) {
      lines.push(`- ${clean(c.authorName, 40)}${c.parentId ? ' (trả lời bình luận)' : ''} ở bài ${clean(c.articleLabel, 90)}`);
      lines.push(`  <${c.url}>`);
      if (c.body) lines.push(`  > ${clean(c.body, 200)}`);
    }
  }
  if (ev.flags.length) {
    lines.push(`\n**Báo cáo vi phạm (${ev.flags.length})** - nên xem sớm`);
    for (const f of ev.flags) lines.push(`- ${clean(f.summary, 160)}`);
  }
  if (ev.reminders.length) {
    lines.push(`\n**Câu hỏi quá 12 giờ chưa ai trả lời (${ev.reminders.length})**`);
    for (const q of ev.reminders) {
      lines.push(`- ${clean(q.authorName, 40)}: ${clean(q.title, 120)}`);
      lines.push(`  <${SITE}/hoi-dap/${q.id}/>`);
    }
  }
  if (ev.users.length) {
    lines.push(`\n**Thành viên mới đăng nhập (${ev.users.length})**: ${ev.users.map((u) => clean(u.displayName || 'Thành viên', 40)).join(', ')}`);
  }

  // chia theo giới hạn Discord, cắt ở ranh giới dòng
  const messages = [];
  let cur = head;
  for (const line of lines) {
    if (cur.length + line.length + 1 > MSG_LIMIT) {
      messages.push(cur);
      cur = '(tiếp)';
    }
    cur += `\n${line}`;
  }
  messages.push(cur);
  if (messages.length > MAX_MESSAGES) {
    const kept = messages.slice(0, MAX_MESSAGES);
    kept[MAX_MESSAGES - 1] += `\n(còn nhiều mục nữa, xem Firestore/Admin)`;
    return kept;
  }
  return messages;
}

// ---------- IO ----------

function readState(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function writeState(file, state) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, file);
}

function tsToDate(v) {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function collectEvents(db, { Timestamp, sinceDate, now, state, adminUids, includeSeed }) {
  const real = (uid) => includeSeed || isRealActor(uid, adminUids);
  const seen = new Set(state.seen || []);
  const fresh = []; // id mới sẽ thêm vào seen
  const mark = (id) => { fresh.push(id); };
  const isNew = (id) => !seen.has(id);
  const since = Timestamp.fromDate(sinceDate);
  const ev = { questions: [], answers: [], comments: [], users: [], flags: [], reminders: [] };

  // Câu hỏi: lấy 14 ngày gần nhất 1 lần cho cả "mới" lẫn nhắc chưa trả lời
  const windowStart = new Date(Math.min(sinceDate.getTime(), now.getTime() - 14 * 86400000));
  const postsSnap = await db.collection('posts')
    .where('createdAt', '>', Timestamp.fromDate(windowStart)).orderBy('createdAt', 'desc').limit(200).get();
  const postTitles = new Map();
  for (const d of postsSnap.docs) {
    const x = d.data();
    postTitles.set(d.id, x.title || d.id);
    const created = tsToDate(x.createdAt);
    if (!real(x.authorUid) || x.flagged) continue;
    if (created && created > sinceDate && isNew(`q:${d.id}`)) {
      ev.questions.push({ id: d.id, title: x.title, body: x.body, authorName: x.authorName || 'Thành viên' });
      mark(`q:${d.id}`);
    } else if (
      created && now - created > REMIND_AFTER_MS && (x.answerCount ?? 0) === 0 && !x.solvedAnswerId
      && isNew(`r:${d.id}`) && isNew(`q:${d.id}`) === false
    ) {
      ev.reminders.push({ id: d.id, title: x.title, authorName: x.authorName || 'Thành viên' });
      mark(`r:${d.id}`);
    }
  }

  // Trả lời: chỉ quét bài có answerCount đổi so với lần trước
  const counts = { ...(state.answerCounts || {}) };
  const allPosts = await db.collection('posts').orderBy('createdAt', 'desc').limit(300).get();
  for (const d of allPosts.docs) {
    const n = d.data().answerCount ?? 0;
    const prev = counts[d.id];
    counts[d.id] = n;
    if (n === 0 || prev === n) continue;
    const ans = await d.ref.collection('answers').where('createdAt', '>', since).get();
    for (const a of ans.docs) {
      const x = a.data();
      if (!real(x.authorUid) || x.isAI || !isNew(`a:${d.id}/${a.id}`)) continue;
      ev.answers.push({ postId: d.id, postTitle: d.data().title || d.id, body: x.body, authorName: x.authorName || 'Thành viên' });
      mark(`a:${d.id}/${a.id}`);
    }
  }

  // Bình luận bài viết
  const arts = await db.collection('articles').listDocuments();
  for (const ref of arts) {
    const cs = await ref.collection('comments').where('createdAt', '>', since).get();
    for (const c of cs.docs) {
      const x = c.data();
      const id = `c:${ref.id}/${c.id}`;
      if (!real(x.authorUid) || x.isAI || !isNew(id)) continue;
      ev.comments.push({
        authorName: x.authorName || 'Thành viên', body: x.body, parentId: x.parentId || null,
        articleLabel: ref.id.replace(/^(batdau|huongdan)-/, '').replace(/-/g, ' '), url: articleUrl(ref.id),
      });
      mark(id);
    }
  }

  // Thành viên mới
  const us = await db.collection('users').where('createdAt', '>', since).get();
  for (const u of us.docs) {
    const x = u.data();
    if (!real(u.id) || x.role === 'ai' || !isNew(`u:${u.id}`)) continue;
    ev.users.push({ displayName: x.displayName });
    mark(`u:${u.id}`);
  }

  // Báo cáo vi phạm đang mở
  const fl = await db.collection('flags').where('status', '==', 'open').limit(50).get();
  for (const f of fl.docs) {
    if (!isNew(`f:${f.id}`)) continue;
    const x = f.data();
    const target = x.targetType || x.type || 'nội dung';
    ev.flags.push({ summary: `${target}${x.targetId ? ` ${x.targetId}` : ''}${x.reason ? `: ${x.reason}` : ''}` });
    mark(`f:${f.id}`);
  }

  return { ev, fresh, counts };
}

async function sendDiscord(token, channelId, content) {
  const base = `https://discord.com/api/v10/channels/${channelId}/messages`;
  const res = await fetch(base, {
    method: 'POST',
    headers: { Authorization: `Bot ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'DiscordBot (congdongai-alerts, 1.0)' },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] }, flags: 4 }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Discord POST ${res.status}`);
  const msg = await res.json();
  const check = await fetch(`${base}/${msg.id}`, {
    headers: { Authorization: `Bot ${token}`, 'User-Agent': 'DiscordBot (congdongai-alerts, 1.0)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!check.ok) throw new Error(`Discord GET verify ${check.status}`);
  return msg.id;
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (n) => args.includes(`--${n}`);
  const val = (n) => (args.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1];
  const dryRun = flag('dry-run');
  const stateFile = process.env.ALERT_STATE_FILE || path.join(REPO, '.community-alerts-state.json');
  const channelId = process.env.DISCORD_CHANNEL_ID;
  const token = process.env.DISCORD_BOT_TOKEN;
  const now = new Date();

  const state = readState(stateFile) || { cursor: null, seen: [], answerCounts: {} };

  const { initializeApp, cert, applicationDefault } = await import('firebase-admin/app');
  const { getFirestore, Timestamp } = await import('firebase-admin/firestore');
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credPath && !fs.existsSync(credPath)) throw new Error('Không thấy file service account');
  const app = initializeApp({ credential: credPath ? cert(credPath) : applicationDefault() });
  const db = getFirestore(app, 'congdongai');

  const adminUids = parseAdminUids(fs.readFileSync(path.join(REPO, 'apphosting.yaml'), 'utf8'));
  const sinceArg = val('since');
  const sinceDate = sinceArg ? new Date(sinceArg) : state.cursor ? new Date(state.cursor) : now;
  if (!state.cursor && !sinceArg) console.error('Lần đầu: đặt mốc = bây giờ.');

  const { ev, fresh, counts } = await collectEvents(db, {
    Timestamp, sinceDate, now, state, adminUids, includeSeed: flag('include-seed'),
  });
  const messages = flag('init') ? [] : buildDigest(ev, now);

  if (dryRun) {
    console.log(`[dry-run] since=${sinceDate.toISOString()} adminUids=${adminUids.length}`);
    console.log(JSON.stringify(Object.fromEntries(Object.entries(ev).map(([k, v]) => [k, v.length]))));
    for (const m of messages) console.log(`\n--- ${m.length} ký tự ---\n${m}`);
    return;
  }

  if (messages.length) {
    if (!token || !channelId) throw new Error('Thiếu DISCORD_BOT_TOKEN hoặc DISCORD_CHANNEL_ID');
    for (const m of messages) await sendDiscord(token, channelId, m);
  }

  const next = {
    cursor: new Date(now.getTime() - OVERLAP_MS).toISOString(),
    seen: [...new Set([...(state.seen || []), ...fresh])].slice(-MAX_SEEN),
    answerCounts: counts,
    lastRun: now.toISOString(),
    lastSentMessages: messages.length,
  };
  writeState(stateFile, next);
  // Không có gì để báo: không in gì (cron im lặng).
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main().catch((err) => {
    console.error(`community-alerts lỗi: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  });
}
