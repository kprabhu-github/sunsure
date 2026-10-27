/**
 * Catenary geometry for the hero "cable".
 * One curve is used twice: as the top edge of the photo plate (clip-path, objectBoundingBox units)
 * and as the red conductor line. Coordinates are 0..1 in both axes of the plate box.
 */
export type CableState = {
  sag: number;      // depth of the valley as a fraction of plate height
  centre: number;   // x of the lowest point, 0..1
  pluck: number;    // transient extra sag (elastic on slide change)
  reveal: number;   // 0 = collapsed at the bottom edge, 1 = fully risen
  tension: number;  // 0 = slack, 1 = taut (scroll)
};

const K = 2.3;
const X0 = 0.045;
const X1 = 0.955;
const N = 64;
const COSH_K = Math.cosh(K) - 1;

function curveY(x: number, sag: number, c: number): number {
  const u = x <= c ? (x - c) / (c - X0) : (x - c) / (X1 - c);
  const cl = Math.max(-1, Math.min(1, u));
  return sag * (1 - (Math.cosh(K * cl) - 1) / COSH_K);
}

const f = (n: number) => n.toFixed(4);

export function buildCable(s: CableState, tensionRelief: number) {
  const sag = Math.max(0, s.sag * (1 - tensionRelief * s.tension) + s.pluck * 0.06);
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = i / N;
    const y = curveY(x, sag, s.centre);
    pts.push([x, 1 - s.reveal * (1 - y)]);
  }
  const line = 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
  return { pts, line, fill: `${line}L1 1L0 1Z` };
}

/** Sub-path of the polyline between t0..t1 (0..1 by index) — used for the travelling pulse. */
export function slice(pts: [number, number][], t0: number, t1: number): string {
  const a = Math.max(0, Math.floor(t0 * N));
  const b = Math.min(N, Math.ceil(t1 * N));
  if (b - a < 1) return '';
  return 'M' + pts.slice(a, b + 1).map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
}
