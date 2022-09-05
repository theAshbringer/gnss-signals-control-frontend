import { NKASysNumbers, BisIDs } from "./knp-common";

/** Цвет для каждого НКА */
const NkaColor: { [K in typeof NKASysNumbers[number]]: string } = {
  1: "#dadada",
  2: "#2f4f4f",
  3: "#556b2f",
  4: "#800000",
  5: "#483d8b",
  6: "#008000",
  7: "#9acd32",
  8: "#00008b",
  9: "#8b008b",
  10: "#66cdaa",
  11: "#ff0000",
  12: "#ff8c00",
  13: "#ffff00",
  14: "#7cfc00",
  15: "#00fa9a",
  16: "#00bfff",
  17: "#0000ff",
  18: "#ff00ff",
  19: "#1e90ff",
  20: "#db7093",
  21: "#f0e68c",
  22: "#ff1493",
  23: "#ffa07a",
  24: "#ee82ee",
} as const;

const NavSolutionColor = {
  true: "#0000ff",
  false: "#ff0000",
} as const;

const NavSolutionENUColor = {
  e: "#ff6666",
  n: "#cccc00",
  u: "#9933ff",
  dt: "#6699ff",
} as const;

/** Цвет для каждого Комплект */
const BisColor: { [K in typeof BisIDs[number]]: string } = {
  1: "#0000ff",
} as const;

export { NkaColor, BisColor, NavSolutionColor, NavSolutionENUColor };
