export interface IRGB {
  r: number;
  g: number;
  b: number;
}

export const hsl2grb = (H: number, S: number, L: number): IRGB => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (S === 0) {
    r = L;
    g = L;
    b = L;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let newT = t;
      if (newT < 0) newT += 1;
      if (newT > 1) newT -= 1;
      if (newT < 1 / 6) return p + (q - p) * 6 * newT;
      if (newT < 1 / 2) return q;
      if (newT < 2 / 3) return p + (q - p) * (2 / 3 - newT) * 6;
      return p;
    };

    const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    const p = 2 * L - q;
    r = hue2rgb(p, q, H + 1 / 3);
    g = hue2rgb(p, q, H);
    b = hue2rgb(p, q, H - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};
