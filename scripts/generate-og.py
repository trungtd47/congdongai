"""Generate the static sharing card for CongDongAI.

Development-only generator; Pillow and system DejaVu fonts are required.
The website serves public/og.png, so no Python runtime dependency is deployed.
Run: python scripts/generate-og.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = Path('/usr/share/fonts/truetype/dejavu')


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    filename = 'DejaVuSans.ttf'
    if bold:
        filename = 'DejaVuSans-Bold.ttf'
    return ImageFont.truetype(str(FONTS / filename), size)


def draw_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str,
              size: int, color: str, bold: bool = False) -> None:
    chosen = font(size, bold)
    box = draw.textbbox(xy, text, font=chosen)
    if box[2] > 1130 or box[3] > 595:
        raise ValueError(f'Text exceeds safe image area: {text}')
    draw.text(xy, text, font=chosen, fill=color)


def main() -> None:
    canvas = Image.new('RGB', (1200, 630), '#FBF7F0')
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((40, 38, 1160, 592), radius=24,
                           fill='#FFFFFF', outline='#E9E1D5', width=2)
    draw.rounded_rectangle((72, 75, 80, 553), radius=4, fill='#0E7C71')
    draw_text(draw, (108, 76), 'Cộng Đồng AI.org', 32, '#8B5E3C', True)
    draw_text(draw, (108, 150), 'Hermes AI Agent', 66, '#2B241D', True)
    draw_text(draw, (108, 232), 'Tiếng Việt', 62, '#0E7C71', True)
    draw.line((108, 335, 1090, 335), fill='#E9E1D5', width=2)
    draw_text(draw, (108, 369), 'Cài, giao việc, kiểm kết quả', 38, '#2B241D')
    draw_text(draw, (108, 435), 'Hướng dẫn và kinh nghiệm có nguồn', 28, '#6F6558')
    draw_text(draw, (108, 515), 'congdongai.org', 26, '#8B5E3C', True)
    target = ROOT / 'public' / 'og.png'
    canvas.save(target, format='PNG', optimize=True)
    print(f'{target} | {canvas.width}x{canvas.height} | {target.stat().st_size} bytes')


if __name__ == '__main__':
    main()
