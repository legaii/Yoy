import { concat } from "lodash";
import { Null } from "./Null";

export interface Soldier {
  type: "Soldier";
  level: number;
};

export interface Farm {
  type: "Farm";
};

export interface Tower {
  type: "Tower";
  level: number;
};

export type Block = Null | Soldier | Farm | Tower;

export const blocks: Block[] = concat<Block>(
  [1, 2, 3, 4].map((level: number) => ({ type: "Soldier", level })),
  { type: "Farm" },
  { type: "Tower", level: 2 },
);
