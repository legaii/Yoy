import { Block } from "./Block";

export const getDistance = (block: Block): number => {
  if (block.type === "Soldier") {
    return 4;
  }
  return 0;
};
