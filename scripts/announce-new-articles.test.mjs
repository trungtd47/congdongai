import test from "node:test";
import assert from "node:assert/strict";
import { parseFeed, selectNew, gate, buildMessage, vnHour, MAX_NEW, MIN_GAP_MS } from "./announce-new-articles.mjs";

const xml = `<rss><channel><item><title>A &amp; B</title><link>https://congdongai.org/blog/a/</link></item><item><title>Bài C</title><link>https://congdongai.org/bat-dau/c/</link></item><item><title>Ngoài</title><link>https://example.com/x/</link></item></channel></rss>`;

test("đọc feed và giải mã ký tự", () => {
  const it = parseFeed(xml);
  assert.equal(it.length, 3);
  assert.equal(it[0].title, "A & B");
});

test("chỉ lấy bài chưa báo và thuộc site", () => {
  const n = selectNew(parseFeed(xml), ["https://congdongai.org/blog/a/"]);
  assert.deepEqual(n.map((i) => i.link), ["https://congdongai.org/bat-dau/c/"]);
});

test("giờ Việt Nam", () => {
  assert.equal(vnHour(new Date("2026-10-16T01:00:00Z")), 8);
  assert.equal(vnHour(new Date("2026-10-16T14:00:00Z")), 21);
});

test("giờ yên lặng và khoảng cách tối thiểu", () => {
  const day = new Date("2026-10-16T05:00:00Z"); // 12h VN
  assert.equal(gate({ now: day, lastSentAtMs: 0, count: 1 }), null);
  assert.equal(gate({ now: new Date("2026-10-16T16:00:00Z"), lastSentAtMs: 0, count: 1 }), "quiet-hours"); // 23h VN
  assert.equal(gate({ now: new Date("2026-10-15T20:00:00Z"), lastSentAtMs: 0, count: 1 }), "quiet-hours"); // 3h VN
  assert.equal(gate({ now: day, lastSentAtMs: day.getTime() - MIN_GAP_MS + 1000, count: 1 }), "min-gap");
  assert.equal(gate({ now: day, lastSentAtMs: day.getTime() - MIN_GAP_MS - 1000, count: 1 }), null);
});

test("quá nhiều bài mới thì chặn, --force bỏ qua", () => {
  const day = new Date("2026-10-16T05:00:00Z");
  assert.equal(gate({ now: day, lastSentAtMs: 0, count: MAX_NEW + 1 }), "too-many");
  assert.equal(gate({ now: new Date("2026-10-16T16:00:00Z"), lastSentAtMs: 0, count: 9, force: true }), null);
});

test("nội dung thông báo: 1 bài và gom nhiều bài", () => {
  const one = buildMessage([{ title: "Bài X", link: "https://congdongai.org/blog/x/" }]);
  assert.equal(one.url, "/blog/x/");
  assert.equal(one.body, "Bài X");
  const many = buildMessage([1, 2, 3, 4].map((n) => ({ title: `T${n}`, link: `https://congdongai.org/blog/t${n}/` })));
  assert.equal(many.title, "4 bài mới trên Cộng Đồng AI");
  assert.equal(many.url, "/bai-viet/");
  assert.equal(many.body, "T1 · T2 và 2 bài khác");
});
