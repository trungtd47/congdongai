export const siteConfig = {
  name: 'Cộng Đồng AI',
  url: 'https://congdongai.org',
  description:
    'Cộng Đồng AI — hub tiếng Việt dạy người dùng phổ thông cài và dùng Hermes Agent, trợ lý AI mã nguồn mở của Nous Research. Không cần biết code.',
  ogImage: 'https://congdongai.org/og.png',
  twitterHandle: '@congdongai',
  locale: 'vi_VN',
  madeBy: {
    name: 'TheMoneyBrew',
    url: 'https://themoneybrew.org',
  },
};

export function canonicalUrl(path: string): string {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
  return `${siteConfig.url}${clean}`;
}
