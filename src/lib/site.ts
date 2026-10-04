export const siteConfig = {
  name: "Cộng Đồng AI.org",
  title: "Cộng đồng Hermes AI Agent Tiếng Việt | Cộng Đồng AI.org",
  url: "https://congdongai.org",
  description:
    "Cộng đồng Hermes Agent Tiếng Việt: hướng dẫn cài và dùng Hermes AI Agent, prompt thực hành, bộ não thứ hai và kinh nghiệm có nguồn cho người mới.",
  ogImage: "https://congdongai.org/og.png",
  twitterHandle: "@congdongai",
  locale: "vi_VN",
  madeBy: {
    name: "TheMoneyBrew",
    url: "https://themoneybrew.org",
  },
};

export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "") + "/";
  return `${siteConfig.url}${clean}`;
}
