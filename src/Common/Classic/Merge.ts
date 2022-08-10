import { Maybe } from "../Null";
import { Block } from "./Block";



export const merge = (a: Block, b: Block): Maybe<Block> => {

  if (a.type !== b.type) {
    return { type: "Null" };
  }

  if (a.type === "Soldier" && b.type === "Soldier") {
    const level: number = a.level + b.level;
    if (level > 4) {
      return { type: "Null" };
    }
    return { type: "Soldier", level };
  }

  if (a.type === "Tower" && b.type === "Tower") {
    return { type: "Tower", level: Math.max(a.level, b.level) };
  }

  return { type: "Null" };
};
