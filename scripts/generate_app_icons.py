from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "src-tauri" / "icons"


PNG_TARGETS = {
    "16x16.png": 16,
    "32x32.png": 32,
    "48x48.png": 48,
    "64x64.png": 64,
    "128x128.png": 128,
    "128x128@2x.png": 256,
    "256x256.png": 256,
    "512x512.png": 512,
    "icon.png": 512,
    "Square30x30Logo.png": 30,
    "Square44x44Logo.png": 44,
    "Square71x71Logo.png": 71,
    "Square89x89Logo.png": 89,
    "Square107x107Logo.png": 107,
    "Square142x142Logo.png": 142,
    "Square150x150Logo.png": 150,
    "Square284x284Logo.png": 284,
    "Square310x310Logo.png": 310,
    "StoreLogo.png": 50,
}


def gradient(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pixels = image.load()
    top = (9, 18, 42)
    bottom = (17, 45, 86)
    accent = (11, 98, 142)
    for y in range(size):
        t = y / max(1, size - 1)
        for x in range(size):
            u = x / max(1, size - 1)
            mix = min(1.0, max(0.0, (u * 0.55 + (1 - t) * 0.45)))
            r = int(top[0] * (1 - t) + bottom[0] * t + accent[0] * mix * 0.22)
            g = int(top[1] * (1 - t) + bottom[1] * t + accent[1] * mix * 0.22)
            b = int(top[2] * (1 - t) + bottom[2] * t + accent[2] * mix * 0.22)
            pixels[x, y] = (r, g, b, 255)
    return image


def draw_arrow(draw: ImageDraw.ImageDraw, start: tuple[float, float], end: tuple[float, float], width: int, color: tuple[int, int, int, int]) -> None:
    draw.line([start, end], fill=color, width=width, joint="curve")
    angle = math.atan2(end[1] - start[1], end[0] - start[0])
    head_len = width * 2.25
    head_angle = math.radians(34)
    left = (
        end[0] - head_len * math.cos(angle - head_angle),
        end[1] - head_len * math.sin(angle - head_angle),
    )
    right = (
        end[0] - head_len * math.cos(angle + head_angle),
        end[1] - head_len * math.sin(angle + head_angle),
    )
    draw.polygon([end, left, right], fill=color)


def draw_icon(size: int) -> Image.Image:
    scale = 4
    canvas_size = size * scale
    radius = int(canvas_size * 0.23)
    image = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    mask = Image.new("L", (canvas_size, canvas_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, canvas_size - 1, canvas_size - 1], radius=radius, fill=255)

    base = gradient(canvas_size)
    image.alpha_composite(Image.composite(base, Image.new("RGBA", base.size), mask))
    draw = ImageDraw.Draw(image)

    inset = canvas_size * 0.17
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.rounded_rectangle(
        [inset, inset, canvas_size - inset, canvas_size - inset],
        radius=int(canvas_size * 0.19),
        outline=(77, 208, 255, 160),
        width=max(2, int(canvas_size * 0.018)),
    )
    image.alpha_composite(glow.filter(ImageFilter.GaussianBlur(canvas_size * 0.012)))

    line_width = max(5, int(canvas_size * 0.082))
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    draw_arrow(
        shadow_draw,
        (canvas_size * 0.25, canvas_size * 0.39),
        (canvas_size * 0.73, canvas_size * 0.39),
        line_width,
        (0, 0, 0, 75),
    )
    draw_arrow(
        shadow_draw,
        (canvas_size * 0.75, canvas_size * 0.61),
        (canvas_size * 0.27, canvas_size * 0.61),
        line_width,
        (0, 0, 0, 75),
    )
    image.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(canvas_size * 0.012)))

    draw_arrow(
        draw,
        (canvas_size * 0.25, canvas_size * 0.39),
        (canvas_size * 0.73, canvas_size * 0.39),
        line_width,
        (81, 211, 255, 255),
    )
    draw_arrow(
        draw,
        (canvas_size * 0.75, canvas_size * 0.61),
        (canvas_size * 0.27, canvas_size * 0.61),
        line_width,
        (77, 124, 255, 255),
    )

    node = canvas_size * 0.115
    cx = cy = canvas_size * 0.5
    diamond = [(cx, cy - node), (cx + node, cy), (cx, cy + node), (cx - node, cy)]
    draw.polygon(diamond, fill=(248, 251, 255, 255))
    inner = node * 0.46
    draw.rounded_rectangle(
        [cx - inner, cy - inner, cx + inner, cy + inner],
        radius=max(2, int(inner * 0.45)),
        fill=(15, 31, 61, 255),
    )

    highlight = Image.new("RGBA", image.size, (0, 0, 0, 0))
    highlight_draw = ImageDraw.Draw(highlight)
    highlight_draw.rounded_rectangle(
        [canvas_size * 0.04, canvas_size * 0.035, canvas_size * 0.96, canvas_size * 0.96],
        radius=radius,
        outline=(255, 255, 255, 45),
        width=max(2, int(canvas_size * 0.012)),
    )
    image.alpha_composite(highlight)

    return image.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    master = draw_icon(1024)
    for filename, size in PNG_TARGETS.items():
        master.resize((size, size), Image.Resampling.LANCZOS).save(ICON_DIR / filename)

    ico_sizes = [16, 24, 32, 48, 64, 128, 256]
    master.save(ICON_DIR / "icon.ico", sizes=[(size, size) for size in ico_sizes])

    icns_sizes = [16, 32, 64, 128, 256, 512, 1024]
    icns_images = [master.resize((size, size), Image.Resampling.LANCZOS) for size in icns_sizes]
    icns_images[0].save(ICON_DIR / "icon.icns", format="ICNS", append_images=icns_images[1:])


if __name__ == "__main__":
    main()
