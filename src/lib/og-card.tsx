import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isAdminAuthorName } from "@/lib/site";

// Ảnh chia sẻ riêng cho từng bài (Facebook, Zalo, X, Telegram...). Dựng bằng next/og lúc build.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const GREEN = "#38513B";
const GOLD = "#D9B04A";

// File nằm ở src/assets; next.config có outputFileTracingIncludes để bản standalone mang theo.
async function asset(rel: string): Promise<Buffer> {
  return readFile(path.join(process.cwd(), "src", "assets", rel));
}

const toDataUrl = (buf: Buffer, mime: string) =>
  `data:${mime};base64,${buf.toString("base64")}`;

// Cỡ chữ tiêu đề theo độ dài để luôn vừa khung và không bị cắt giữa chừng.
function titleSize(len: number) {
  if (len <= 40) return 72;
  if (len <= 70) return 62;
  if (len <= 100) return 54;
  return 46;
}

function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, "")}...`;
}

export interface OgCardInput {
  label: string; // Kinh nghiệm / Bắt đầu / Hướng dẫn / Câu chuyện / Hỏi & Đáp
  title: string;
  authorName?: string;
}

export async function renderOgCard({ label, title, authorName }: OgCardInput) {
  const [serif, sans, avatar, logo] = await Promise.all([
    asset("fonts/NotoSerif-Bold.ttf"),
    asset("fonts/NotoSans-Bold.ttf"),
    asset("og-avatar.jpg"),
    asset("og-logo-light.svg"),
  ]);

  const shown = clip(title, 120);
  const admin = isAdminAuthorName(authorName);
  const byline = authorName?.trim();
  const logoUrl = toDataUrl(logo, "image/svg+xml");

  // Bìa tràn khung (không khung viền, không giống ảnh chụp): nền xanh trầm, logo Hermes mờ lớn, tiêu đề serif.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: GREEN,
          fontFamily: "NotoSans",
          color: "#F8F5EF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          width={520}
          height={520}
          alt=""
          style={{ position: "absolute", right: -70, bottom: -90, opacity: 0.1 }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: 630, background: GOLD, display: "flex" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px 52px 84px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: GREEN,
                background: GOLD,
                padding: "8px 20px",
                borderRadius: 4,
              }}
            >
              {label}
            </div>
            <div style={{ display: "flex", fontSize: 28, color: "#D8DFCF" }}>Cộng Đồng AI.org</div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "NotoSerif",
              fontSize: titleSize(shown.length) + 4,
              lineHeight: 1.22,
              color: "#FFFDF8",
              maxWidth: 980,
            }}
          >
            {shown}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#D8DFCF" }}>
            {admin && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={toDataUrl(avatar, "image/jpeg")}
                width={56}
                height={56}
                alt=""
                style={{ borderRadius: 28, objectFit: "cover" }}
              />
            )}
            <span>{byline || "Hỏi và học Hermes bằng tiếng Việt"}</span>
            {admin && (
              <span
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: GREEN,
                  background: "#F8F5EF",
                  padding: "4px 14px",
                  borderRadius: 14,
                }}
              >
                Admin
              </span>
            )}
            <span style={{ display: "flex", marginLeft: 12, color: GOLD }}>congdongai.org</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "NotoSerif", data: serif, weight: 700, style: "normal" },
        { name: "NotoSans", data: sans, weight: 700, style: "normal" },
      ],
    },
  );
}

// Bài có ảnh/sơ đồ trong thân bài dùng đúng ảnh đó làm ảnh chia sẻ (public/og/<tuyến>-<slug>.png,
// tạo bằng scripts/generate-article-og.mjs). Bài không có ảnh thì dùng thẻ tiêu đề.
export async function renderArticleOg(section: string, slug: string, input: OgCardInput) {
  const file = path.join(process.cwd(), "public", "og", `${section}-${slug}.png`);
  if (existsSync(file)) {
    return new Response(new Uint8Array(await readFile(file)), {
      headers: { "content-type": OG_CONTENT_TYPE, "cache-control": "public, max-age=3600" },
    });
  }
  return renderOgCard(input);
}
