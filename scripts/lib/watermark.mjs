// Watermark congdongai.org kiểu tối giản: chỉ chữ nhỏ, mảnh, giãn chữ nhẹ, hơi trong suốt, góc phải dưới.
// Màu tự chọn theo độ sáng vùng góc (nền sáng -> mực xám đậm, nền tối -> trắng) để luôn đọc được mà không cần khung/viền.
import sharp from "sharp";

export const WM_TEXT = "congdongai.org";
const FONT = "Noto Sans, DejaVu Sans, Arial, sans-serif";

export function wmMetrics(width) {
  const size = Math.max(11, Math.round(width * 0.019));
  const margin = Math.round(Math.max(12, width * 0.022));
  const textW = Math.round(size * 0.62 * WM_TEXT.length + size * 0.06 * WM_TEXT.length);
  return { size, margin, textW };
}

// busy = vùng góc nhiều chi tiết/tương phản (ảnh chụp): dùng chữ trắng có viền tối mềm để đọc được trên cả mảng sáng lẫn tối.
function inkFor(luma, busy) {
  if (busy) return { fill: "#FFFFFF", opacity: 0.92, halo: "#000000", haloOpacity: 0.3, haloWidth: 0.2 };
  return luma > 150 ? { fill: "#292C25", opacity: 0.58, halo: "#FFFFFF", haloOpacity: 0.22, haloWidth: 0.18 } : { fill: "#FFFFFF", opacity: 0.78, halo: "#000000", haloOpacity: 0.22, haloWidth: 0.18 };
}

// Đo độ sáng vùng góc phải dưới (0-255) từ buffer ảnh đã ở đúng kích thước.
export async function cornerLuma(buf, width, height) {
  const { size, margin, textW } = wmMetrics(width);
  const w = Math.min(width, textW + margin * 2), h = Math.min(height, size + margin * 2);
  const stats = await sharp(buf).extract({ left: width - w, top: height - h, width: w, height: h }).flatten({ background: "#ffffff" }).stats();
  const [r, g, b] = stats.channels.map((c) => c.mean);
  const sd = stats.channels.slice(0, 3).reduce((a, c) => a + c.stdev, 0) / 3;
  return { luma: 0.2126 * r + 0.7152 * g + 0.0722 * b, busy: sd > 48 };
}

// Phần tử <text> (dùng cho cả SVG gốc lẫn lớp phủ raster).
export function wmText(width, height, { luma, busy }) {
  const { size, margin } = wmMetrics(width);
  const ink = inkFor(luma, busy);
  const x = width - margin, y = height - margin;
  const common = `x="${x}" y="${y}" text-anchor="end" font-family="${FONT}" font-weight="500" font-size="${size}" letter-spacing="${(size * 0.06).toFixed(2)}"`;
  return (
    `<text ${common} fill="${ink.halo}" fill-opacity="${ink.haloOpacity}" stroke="${ink.halo}" stroke-opacity="${ink.haloOpacity}" stroke-width="${(size * ink.haloWidth).toFixed(2)}" stroke-linejoin="round">${WM_TEXT}</text>` +
    `<text ${common} fill="${ink.fill}" fill-opacity="${ink.opacity}">${WM_TEXT}</text>`
  );
}

// Đóng watermark lên buffer raster, trả buffer PNG (hoặc JPEG nếu format=jpeg).
export async function applyWatermark(buf, { format = "png" } = {}) {
  const meta = await sharp(buf).metadata();
  const { width, height } = meta;
  const luma = await cornerLuma(buf, width, height);
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${wmText(width, height, luma)}</svg>`);
  const img = sharp(buf).composite([{ input: svg, left: 0, top: 0 }]);
  return format === "jpeg" ? img.jpeg({ quality: 92, mozjpeg: true }).toBuffer() : img.png({ compressionLevel: 9 }).toBuffer();
}

// Đóng watermark vào SVG gốc (vẫn là vector). Đo độ sáng bằng cách rasterize SVG ở kích thước viewBox.
export async function watermarkSvg(svgText) {
  const vb = svgText.match(/viewBox="\s*([\d.\-]+)[ ,]+([\d.\-]+)[ ,]+([\d.]+)[ ,]+([\d.]+)\s*"/);
  if (!vb) throw new Error("SVG thiếu viewBox");
  const w = Math.round(parseFloat(vb[3])), h = Math.round(parseFloat(vb[4]));
  const raster = await sharp(Buffer.from(svgText), { density: 96 }).resize(w, h).png().toBuffer();
  const luma = await cornerLuma(raster, w, h);
  return svgText.replace(/<\/svg>\s*$/, `${wmText(w, h, luma)}</svg>\n`);
}
