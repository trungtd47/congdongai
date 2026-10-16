// Đóng watermark congdongai.org thẳng vào các file ảnh dùng trong bài.
// Bản gốc (chưa đóng dấu) nằm ở assets-src/article-images/<đường dẫn như trong public>; script ghi đè bản trong public/.
// Luôn sinh từ bản gốc nên chạy lại bao nhiêu lần cũng không bị đóng dấu chồng.
// Thêm ảnh mới: bỏ bản gốc vào assets-src/article-images/..., chạy `node scripts/watermark-article-images.mjs`.
import fs from "node:fs";
import path from "node:path";
import { applyWatermark, watermarkSvg } from "./lib/watermark.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-src", "article-images");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
}

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const out = path.join(ROOT, "public", rel);
  const ext = path.extname(file).toLowerCase();
  if (ext === ".svg") fs.writeFileSync(out, await watermarkSvg(fs.readFileSync(file, "utf8")));
  else fs.writeFileSync(out, await applyWatermark(fs.readFileSync(file), { format: ext === ".jpg" || ext === ".jpeg" ? "jpeg" : "png" }));
  console.log(`${rel}: ${fs.statSync(file).size} -> ${fs.statSync(out).size} bytes`);
}
