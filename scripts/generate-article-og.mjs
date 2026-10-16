// Ảnh chia sẻ = ảnh thật hoặc cảnh minh họa SVG đầu tiên của bài (sơ đồ khối/bước/thẻ trông như chụp màn hình nên bỏ, dùng bìa tiêu đề), phủ kín 1200x630 (không khung, không nền mờ, không chú thích).
// Ghi vào public/og/<tuyến>-<slug>.png. Dev-only: cần bản build đang chạy (standalone) + Chrome bật CDP.
// Dùng: node scripts/generate-article-og.mjs <baseUrl> <cdpPort> [tuyến/slug ...]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [, , base, cdpPort, ...only] = process.argv;
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "og");
fs.mkdirSync(OUT, { recursive: true });
const W = 1200, H = 630, CREAM = "#F8F5EF";

const targets = [];
for (const s of ["blog", "bat-dau", "huong-dan", "cau-chuyen"]) {
  const dir = path.join(ROOT, ".next/server/app", s);
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".html")) targets.push(`${s}/${f.slice(0, -5)}`);
}
const list = only.length ? only : targets;

// ---- ảnh có sẵn (png/jpg/svg trong public): phủ kín khung, lệch tỉ lệ thì kéo dãn viền bằng chính điểm ảnh biên
async function fromFile(file, out) {
  const src = () => sharp(file, { density: 288 });
  const meta = await src().metadata();
  const aspect = meta.width / meta.height;
  const target = W / H;
  let buf;
  if (Math.abs(aspect - target) / target < 0.08) {
    buf = await src().resize(W, H, { fit: "cover", position: "centre" }).png().toBuffer();
  } else {
    const inner = await src().resize({ width: W, height: H, fit: "inside" }).png().toBuffer();
    const m = await sharp(inner).metadata();
    const dx = W - m.width, dy = H - m.height;
    buf = await sharp(inner)
      .extend({ top: Math.floor(dy / 2), bottom: Math.ceil(dy / 2), left: Math.floor(dx / 2), right: Math.ceil(dx / 2), extendWith: "copy" })
      .png()
      .toBuffer();
  }
  await sharp(buf).flatten({ background: CREAM }).png({ compressionLevel: 9 }).toFile(out);
}

// ---- sơ đồ HTML: dựng lại đúng sơ đồ trong khung 1200x630, không viền/chú thích
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
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

const FIND = `(() => {
  const root = document.querySelector('.prose-article, article.reader') || document.body;
  const els = [...root.querySelectorAll('img, .dg')].filter((e) => {
    if (e.tagName === 'IMG') {
      const s = e.getAttribute('src') || '';
      if (/avatar|hermes-logo/.test(s) || e.closest('.admin-note')) return false;
      return e.getBoundingClientRect().width >= 300;
    }
    return e.classList.contains('dg');
  });
  const pick = (e) => { const r = e.getBoundingClientRect(); return r.width / r.height; };
  const first = els[0];
  if (!first) return null;
  if (first.tagName === 'IMG') return { kind: 'img', src: first.getAttribute('src') };
  const dgs = els.filter((e) => e.classList.contains('dg') && e.querySelector('svg.dg-svg') && !e.querySelector('ol, .dg-chip, .dg-opt'));
  dgs.forEach((e, i) => e.setAttribute('data-og-cand', String(i)));
  return { kind: 'dg', n: dgs.length };
})()`;

const COMPOSE = (CAND) => `(() => {
  const fig = document.querySelector('[data-og-cand="${CAND}"]');
  const natural = fig.getBoundingClientRect().width;
  const clone = fig.cloneNode(true);
  clone.querySelectorAll('figcaption').forEach((e) => e.remove());
  Object.assign(clone.style, { border: 'none', background: 'transparent', padding: '0', margin: '0', boxShadow: 'none', borderRadius: '0', width: natural + 'px', maxWidth: 'none' });
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;overflow:hidden;background:${CREAM}';
  const wrap = document.createElement('div');
  wrap.className = 'prose-article';
  wrap.style.cssText = 'position:absolute;left:0;top:0;transform-origin:0 0;width:' + natural + 'px';
  wrap.appendChild(clone);
  ov.appendChild(wrap);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.appendChild(ov);
  const h = wrap.getBoundingClientRect().height;
  const scene = !!clone.querySelector('svg.dg-svg') && !clone.querySelector('ol, ul, .dg-chip, .dg-opt');
  let s, x, y;
  if (scene) { s = ${W} / natural; x = 0; y = ${H} - h * s; }            // cảnh minh họa: phủ hết bề ngang, nằm sát đáy
  else { s = Math.min((${W} - 96) / natural, (${H} - 96) / h); x = (${W} - natural * s) / 2; y = (${H} - h * s) / 2; }
  wrap.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
  return JSON.stringify({ natural, h, s, scene, fill: scene ? 1 : (natural * s * h * s) / (${W} * ${H}) });
})()`;

const report = [];
for (const key of list) {
  const [section, slug] = key.split("/");
  const file = path.join(OUT, `${section}-${slug}.png`);
  await send("Page.navigate", { url: `${base}/${section}/${slug}/` });
  await new Promise((r) => setTimeout(r, 3500));
  const r = await ev(FIND);
  if (!r) {
    report.push(`${key}: không có ảnh/sơ đồ -> thẻ tiêu đề`);
    continue;
  }
  if (r.kind === "img") {
    const p = path.join(ROOT, "public", r.src.replace(/^\//, ""));
    await fromFile(p, file);
    report.push(`${key}: ảnh ${r.src} -> ${path.relative(ROOT, file)}`);
    continue;
  }
  let done = false;
  for (let c = 0; c < (r.n || 0) && !done; c++) {
    if (c > 0) {
      await send("Page.navigate", { url: `${base}/${section}/${slug}/` });
      await new Promise((r2) => setTimeout(r2, 3000));
      await ev(FIND);
    }
    const info = JSON.parse(await ev(COMPOSE(c)));
    if (info.fill < 0.42) continue; // quá trống: thử sơ đồ kế tiếp
    await new Promise((r2) => setTimeout(r2, 600));
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
    await sharp(Buffer.from(shot.result.data, "base64")).flatten({ background: CREAM }).png({ compressionLevel: 9 }).toFile(file);
    report.push(`${key}: sơ đồ #${c} ${info.scene ? "cảnh" : "khối"} x${info.s.toFixed(2)} lấp ${(info.fill * 100).toFixed(0)}% -> ${path.relative(ROOT, file)}`);
    done = true;
  }
  if (!done) report.push(`${key}: sơ đồ quá trống -> thẻ tiêu đề`);
}
console.log(report.join("\n"));
process.exit(0);
