import { Block } from "./Block";

export const getStrength = (block: Block): number => {
  if (block.type === "Farm") {
    return 0;
  }
  return block.level;
};
