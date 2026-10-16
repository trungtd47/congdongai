// Tạo ảnh chia sẻ từ chính ảnh/sơ đồ đầu tiên trong bài -> public/og/<tuyến>-<slug>.png (1200x630).
// Dev-only: cần bản build đang chạy (standalone) + Chrome bật remote debugging.
// Dùng: node scripts/generate-article-og.mjs <baseUrl> <cdpPort> [section/slug ...]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [, , base, cdpPort, ...only] = process.argv;
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "og");
fs.mkdirSync(OUT, { recursive: true });

const sections = ["blog", "bat-dau", "huong-dan", "cau-chuyen"];
const targets = [];
for (const s of sections) {
  const dir = path.join(ROOT, ".next/server/app", s);
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".html")) targets.push(`${s}/${f.slice(0, -5)}`);
}
const list = only.length ? only : targets;

const t = await (await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: "PUT" })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pend = {};
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend[m.id]) pend[m.id](m);
};
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id;
    const to = setTimeout(() => rej(new Error("timeout " + method)), 25000);
    pend[i] = (m) => {
      clearTimeout(to);
      res(m);
    };
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, returnByValue: true })).result.result.value;

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 900, height: 900, deviceScaleFactor: 2, mobile: false });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

const FIND = `(() => {
  // Ẩn thanh điều hướng dính để không đè lên ảnh chụp.
  for (const e of document.querySelectorAll('*')) {
    const p = getComputedStyle(e).position;
    if (p === 'fixed' || p === 'sticky') e.style.display = 'none';
  }
  const root = document.querySelector('.prose-article, article.reader') || document.body;
  const els = [...root.querySelectorAll('img, .dg')].filter((e) => {
    if (e.tagName === 'IMG') {
      const s = e.getAttribute('src') || '';
      if (/avatar|hermes-logo/.test(s) || e.closest('.admin-note')) return false;
      return e.getBoundingClientRect().width >= 300;
    }
    return e.classList.contains('dg');
  });
  // Ưu tiên ảnh/sơ đồ đầu tiên có dạng ngang; nếu toàn khối cao thì lấy phần trên của khối đầu tiên.
  const wide = els.find((e) => { const r = e.getBoundingClientRect(); return r.width / r.height >= 1.25; });
  const el = wide || els[0];
  if (!el) return null;
  el.scrollIntoView({ block: 'start' });
  const r = el.getBoundingClientRect();
  const maxH = r.width / 1.6;
  return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: wide ? r.height : Math.min(r.height, maxH), kind: el.tagName, src: el.getAttribute('src') || '', cropped: !wide && r.height > maxH };
})()`;

async function compose(buf, file) {
  const W = 1200, H = 630;
  const bg = await sharp(buf).resize(W, H, { fit: "cover" }).blur(26).composite([{ input: { create: { width: W, height: H, channels: 4, background: { r: 248, g: 245, b: 239, alpha: 0.72 } } } }]).png().toBuffer();
  const pad = 14;
  const fg = await sharp(buf)
    .resize({ width: W - 2 * (60 + pad + 2), height: H - 2 * (40 + pad + 2), fit: "inside" })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#FFFDF8" })
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: "#D7D4C9" })
    .png()
    .toBuffer();
  await sharp(bg).composite([{ input: fg, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(file);
}

const report = [];
for (const key of list) {
  const [section, slug] = key.split("/");
  await send("Page.navigate", { url: `${base}/${section}/${slug}/` });
  await new Promise((r) => setTimeout(r, 3500));
  const r = await ev(FIND);
  if (!r) {
    report.push(`${key}: không có ảnh/sơ đồ -> dùng thẻ tiêu đề`);
    continue;
  }
  await new Promise((r2) => setTimeout(r2, 800));
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
  const file = path.join(OUT, `${section}-${slug}.png`);
  await compose(Buffer.from(shot.result.data, "base64"), file);
  report.push(`${key}: ${r.kind} ${r.src}${r.cropped ? ' (cắt phần trên)' : ''} -> ${path.relative(ROOT, file)} (${fs.statSync(file).size} bytes)`);
}
console.log(report.join("\n"));
process.exit(0);
