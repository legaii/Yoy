import { isEqual, cloneDeep, concat, sumBy } from "lodash";
import { Vector2, sum } from "./Vector2";
import { Null, Maybe } from "./Null";
import { Player } from "./Player";
import { Block } from "./Block";



export interface Cell {
  type: "Cell";
  owner: Maybe<Player>;
  block: Block;
};



export interface GameState {
  type: "GameState";
  cells: Cell[][];
  money: {
    [player: string]: number;
  };
};



export const getCost = (
  G: GameState, player: Player, block: Block
): number => {
  switch (block.type) {
    case "Null":
      return 0;
    case "Soldier":
      return block.level * 10;
    case "Farm":
      return concat(...G.cells).filter((cell: Cell) => isEqual(cell, {
        type: "Cell",
        owner: player,
        block: { type: "Farm" },
      })).length * 2 + 12;
    case "Tower":
      return 15;
  }
};



export const getProfit = (
  G: GameState, player: Player
): number => sumBy(
  concat(...G.cells), (cell: Cell) => {
    if (!isEqual(cell.owner, player)) {
      return 0;
    }
    switch (cell.block.type) {
      case "Null":
        return 1;
      case "Soldier":
        return Math.pow(3, cell.block.level - 1) * -2 + 1;
      case "Farm":
        return 5;
      case "Tower":
        return 0;
    }
  }
);



export const getDistance = (
  G: GameState, player: Player, fromPos: Vector2, toPos: Vector2
): number => {

  const dp: number[][] = G.cells.map(
    (row: Cell[]): number[] => row.map(_ => -1)
  );
  dp[fromPos.i][fromPos.j] = 0;

  const queue: Vector2[] = [fromPos];
  const edges: Vector2[] = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(
    ([i, j]) => ({ type: "Vector2", i, j })
  );
  
  while (queue.length > 0) {
    const u: Vector2 = queue.shift() as Vector2;
    edges.forEach((d: Vector2) => {
      const v: Vector2 = sum(u, d);
      if (0 <= v.i && v.i < dp.length &&
          0 <= v.j && v.j < dp[v.i].length && dp[v.i][v.j] === -1) {
        dp[v.i][v.j] = dp[u.i][u.j] + 1;
        if (isEqual(G.cells[v.i][v.j].owner, player)) {
          queue.push(v);
        }
      }
    });
  }

  return dp[toPos.i][toPos.j];
}



export const trySpawn = (
  G: GameState, player: Player,
  block: Block, pos: Vector2, doIt: boolean
): boolean => {
  const cost: number = getCost(G, player, block);
  const target: Cell = G.cells[pos.i][pos.j];
  if (!(isEqual(target.owner, player) &&
        isEqual(target.block, { type: "Null" }) &&
        G.money[player.name] >= cost)) {
    return false;
  }
  if (doIt) {
    G.money[player.name] -= cost;
    target.block = cloneDeep(block);
  }
  return true;
};



export const tryMove = (
  G: GameState, player: Player,
  fromPos: Vector2, toPos: Vector2, doIt: boolean
): boolean => {

  const fromCell: Cell = G.cells[fromPos.i][fromPos.j];
  const toCell: Cell = G.cells[toPos.i][toPos.j];

  if (!(
    isEqual(fromCell.owner, player) &&
    fromCell.block.type === "Soldier" &&
    fromCell.block.movable
  )) {
    return false;
  }

  if (isEqual(toCell.owner, fromCell.owner)) {
    if (toCell.block.type !== "Null") {
      return false;
    }
  } else {
    if (
      (toCell.block.type === "Soldier" || toCell.block.type === "Tower") &&
      toCell.block.level >= fromCell.block.level
    ) {
      return false;
    }
  }

  const d: number = getDistance(G, player, fromPos, toPos);

  if (d === -1 || d > 4) {
    return false;
  }

  if (doIt) {
    fromCell.block.movable = false;
    G.cells[toPos.i][toPos.j] = cloneDeep(fromCell);
    fromCell.block = { type: "Null" };
  }

  return true;
};
