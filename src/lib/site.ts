export const siteConfig = {
  name: 'Cộng Đồng AI',
  url: 'https://congdongai.org',
  description:
    'Cộng đồng Hermes Agent Tiếng Việt: học cách cài, dùng và giao việc thật cho Hermes. Hướng dẫn miễn phí cho người mới, case study có nguồn và nơi hỏi đáp trên Cộng Đồng AI.',
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
