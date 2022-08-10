import { concat } from "lodash";

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

export type Block = Soldier | Farm | Tower;

export const blocks: Block[] = concat<Block>(
  [1, 2, 3, 4].map((level: number) => ({ type: "Soldier", level })),
  { type: "Farm" },
  [2, 3].map((level: number) => ({ type: "Tower", level })),
);
