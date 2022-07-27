import { concat } from "lodash";

export interface Soldier {
  type: "Soldier";
  level: number;
  movable: boolean;
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
  [1, 2, 3, 4].map((level: number) =>
    ({ type: "Soldier", level, movable: true })),
  { type: "Farm" },
  { type: "Tower", level: 2 },
  { type: "Tower", level: 3 },
);
