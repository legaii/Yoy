import { Maybe } from "./Null";

export interface Rules<Block> {
  blocks: Block[];
  getIcon: (block: Block) => string;
  getCost: (blocks: Block[], block: Block) => number;
  getProfit: (blocks: Block[]) => number;
  getStrength: (block: Block) => number;
  getDistance: (block: Block) => number;
  merge: (a: Block, b: Block) => Maybe<Block>;
};
