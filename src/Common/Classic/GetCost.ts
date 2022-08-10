import { isEqual } from "lodash";

import { Block } from "./Block";

export const getCost = (blocks: Block[], block: Block): number => {
  switch (block.type) {
    case "Soldier":
      return block.level * 10;
    case "Farm":
      return blocks.filter(
        (otherBlock: Block) => isEqual(otherBlock, block)
      ).length * 2 + 12;
    case "Tower":
      return (block.level - 1) * 20 - 5;
  }
};
