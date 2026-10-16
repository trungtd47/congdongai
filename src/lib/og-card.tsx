import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isAdminAuthorName } from "@/lib/site";

// Ảnh chia sẻ riêng cho từng bài (Facebook, Zalo, X, Telegram...). Dựng bằng next/og lúc build.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const GREEN = "#38513B";
const BROWN = "#8B5E3C";
const INK = "#292C25";
const MUTED = "#62645B";

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
    asset("og-logo.svg"),
  ]);

  const shown = clip(title, 120);
  const admin = isAdminAuthorName(authorName);
  const byline = authorName?.trim();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F8F5EF",
          padding: 36,
          fontFamily: "NotoSans",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            background: "#FFFDF8",
            border: "2px solid #D7D4C9",
            borderRadius: 20,
          }}
        >
          <div style={{ width: 14, background: GREEN, borderRadius: "20px 0 0 20px", display: "flex" }} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "44px 60px 40px 56px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#FFFDF8",
                  background: GREEN,
                  padding: "8px 22px",
                  borderRadius: 6,
                }}
              >
                {label}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, color: BROWN, fontSize: 30 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={toDataUrl(logo, "image/svg+xml")} width={40} height={40} alt="" />
                Cộng Đồng AI.org
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "NotoSerif",
                fontSize: titleSize(shown.length),
                lineHeight: 1.22,
                color: INK,
              }}
            >
              {shown}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: MUTED }}>
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
                {byline ? <span>{byline}</span> : <span>Hỏi và học Hermes bằng tiếng Việt</span>}
                {admin && (
                  <span
                    style={{
                      display: "flex",
                      fontSize: 20,
                      color: "#FFFDF8",
                      background: GREEN,
                      padding: "4px 14px",
                      borderRadius: 14,
                    }}
                  >
                    Admin
                  </span>
                )}
              </div>
              <div style={{ display: "flex", fontSize: 26, color: BROWN }}>congdongai.org</div>
            </div>
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
