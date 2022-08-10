import { sumBy } from "lodash";

import { Block } from "./Block";

export const getProfit = (blocks: Block[]): number => sumBy(
  blocks, (block: Block): number => {
    switch (block.type) {
      case "Soldier":
        return Math.pow(3, block.level - 1) * -2;
      case "Farm":
        return 4;
      case "Tower":
        return Math.pow(6, block.level - 2);
    }
  }
);
