export interface IHSL {
  h: number;
  s: number;
  l: number;
}

export const rgb2hsl = (R: number, G: number, B: number): IHSV => {
  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  const l = h;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default:
        break;
    }
    h /= 6;
  }

  return { h, s, l };
};
