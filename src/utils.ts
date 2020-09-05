import p5 from "p5";

export const range = (to: number, from: number = 0): number[] =>
  Array.from(Array(to - from)).map((_, i) => i + from);

export const slideArray = <T>(values: T[], amount: number): T[] =>
  [].concat(values.slice(amount)).concat(values.slice(0, amount));

export const sineValues = (size: number, amplitude: number = 1) =>
  range(size).map((i) => amplitude * Math.sin((i / size) * Math.PI * 2));

export const withRepeatRect = (
  s: p5,
  size: p5.Vector,
  spread: p5.Vector,
  renderer: (position: p5.Vector) => void
) => {
  for (const coordY of range(Math.ceil(s.height / size.y) + 2 * spread.y)) {
    for (const coordX of range(Math.ceil(s.width / size.x) + 2 * spread.x)) {
      const position = s.createVector(coordX, coordY);
      s.translate(-spread.x * size.x, -spread.y * size.y);
      s.translate(position.x * size.x, position.y * size.y);
      renderer(position);
      s.resetMatrix();
    }
  }
};

/*
[a, b, c]
60 frames

0-19 frame = a
20-39 frame = b
40-59 frame = c
60-79 frame = a
80-99 frame = b
...
 */
export const cycleByFrame = <T>(
  frameCount: number,
  values: T[],
  frames: number
): T => {
  const frameSizePerValue = frames / values.length;
  const index = Math.floor(frameCount / frameSizePerValue) % values.length;
  return values[index];
};
