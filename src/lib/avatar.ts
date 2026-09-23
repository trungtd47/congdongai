// Màu avatar ổn định theo tên - giúp các thành viên trông khác nhau, có cảm giác người thật.
const palette = [
  '#0E7C71', // teal
  '#C2683F', // clay
  '#B98A2F', // gold
  '#7C3AED', // tím
  '#0F766E', // xanh đậm
  '#B45309', // nâu
  '#4F46E5', // indigo
  '#BE185D', // hồng đậm
];

export function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return palette[h % palette.length];
}
