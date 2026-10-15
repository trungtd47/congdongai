import test from 'node:test';
import assert from 'node:assert/strict';
import { isSeedUid, isRealActor, parseAdminUids, articleUrl, clean, buildDigest } from './community-alerts.mjs';

const empty = () => ({ questions: [], answers: [], comments: [], users: [], flags: [], reminders: [] });
const NOW = new Date('2026-10-15T10:30:00Z');

test('lọc dữ liệu mẫu, AI và admin', () => {
  assert.equal(isSeedUid('u-linh'), true);
  assert.equal(isSeedUid('ai-frida'), true);
  assert.equal(isSeedUid(''), true);
  assert.equal(isSeedUid('1TnUuDQlabcdefghijklmnopqrst'), false);
  assert.equal(isRealActor('PSgMcPSn', ['PSgMcPSn']), false);
  assert.equal(isRealActor('1TnUuDQl', ['PSgMcPSn']), true);
});

test('đọc admin UID từ apphosting.yaml', () => {
  const y = 'env:\n  - variable: CONGDONG_ADMIN_UIDS\n    value: "a1, b2"\n    availability:\n      - RUNTIME\n';
  assert.deepEqual(parseAdminUids(y), ['a1', 'b2']);
  assert.deepEqual(parseAdminUids(''), []);
});

test('URL bài theo tiền tố slug', () => {
  assert.equal(articleUrl('batdau-cai-hermes-desktop-mac'), 'https://congdongai.org/bat-dau/cai-hermes-desktop-mac/');
  assert.equal(articleUrl('huongdan-tro-ly-email'), 'https://congdongai.org/huong-dan/tro-ly-email/');
  assert.equal(articleUrl('soul-md-la-gi'), 'https://congdongai.org/blog/soul-md-la-gi/');
  assert.equal(articleUrl('kinh-nghiem-ban-tin-6h30'), 'https://congdongai.org/cau-chuyen/kinh-nghiem-ban-tin-6h30/');
});

test('clean chặn mention và markdown, cắt độ dài', () => {
  const out = clean('@everyone **xin chào** `x` @here', 100);
  assert.ok(!out.includes('@everyone'));
  assert.ok(!out.includes('*') && !out.includes('`'));
  assert.ok(clean('a'.repeat(500), 50).length <= 50);
});

test('không có sự kiện thì không gửi gì', () => {
  assert.deepEqual(buildDigest(empty(), NOW), []);
});

test('bản tin gom đủ loại, có link và trích đoạn, dưới giới hạn Discord', () => {
  const ev = empty();
  ev.questions.push({ id: 'abc', title: 'Hermes chạy trên Mac cũ?', body: 'Máy mình 8GB @everyone', authorName: 'Hai' });
  ev.answers.push({ postId: 'abc', postTitle: 'Hermes chạy trên Mac cũ?', body: 'Chạy được', authorName: 'Dũng' });
  ev.comments.push({ authorName: 'Lan', body: 'Cảm ơn bài viết', parentId: 'x', articleLabel: 'soul-md-la-gi', url: 'https://congdongai.org/blog/soul-md-la-gi/' });
  ev.users.push({ displayName: 'Diệp Dũng' });
  ev.reminders.push({ id: 'zzz', title: 'Câu hỏi cũ', authorName: 'Mai' });
  const msgs = buildDigest(ev, NOW);
  assert.equal(msgs.length, 1);
  const m = msgs[0];
  assert.ok(m.includes('https://congdongai.org/hoi-dap/abc/'));
  assert.ok(m.includes('<https://congdongai.org/blog/soul-md-la-gi/>'));
  assert.ok(m.includes('trả lời bình luận'));
  assert.ok(m.includes('Diệp Dũng'));
  assert.ok(!m.includes('@everyone'));
  assert.ok(m.length < 2000);
});

test('bản tin dài được chia, tối đa 3 tin, mỗi tin dưới 2000 ký tự', () => {
  const ev = empty();
  for (let i = 0; i < 60; i++) ev.questions.push({ id: `q${i}`, title: 'Tiêu đề '.repeat(10), body: 'Nội dung '.repeat(30), authorName: `Người ${i}` });
  const msgs = buildDigest(ev, NOW);
  assert.ok(msgs.length >= 2 && msgs.length <= 3);
  for (const m of msgs) assert.ok(m.length < 2000, `tin dài ${m.length}`);
});
