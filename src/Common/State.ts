import { isEqual, cloneDeep, concat } from "lodash";

import { Vector2, sum, getSize } from "./Vector2";
import { Null, Maybe } from "./Null";
import { Player } from "./Player";
import type { Block } from "./Classic";
import { rules } from "./Classic";


export { Block, rules };

export interface BlockContainer {
  type: "BlockContainer";
  block: Block;
  movable: boolean;
};

export interface Cell {
  type: "Cell";
  owner: Maybe<Player>;
  block: Maybe<BlockContainer>;
};

export interface GameState {
  type: "GameState";
  cells: Cell[][];
  money: {
    [player: string]: number;
  };
};



const getEdges = (G: GameState, pos: Vector2): Vector2[] => {
  return [[0, 1], [0, -1], [1, 0], [-1, 0]].map(
    ([i, j]): Vector2 => sum(pos, { type: "Vector2", i, j })
  ).filter(
    (u: Vector2): boolean => (
      0 <= u.i && u.i < getSize(G.cells).i &&
      0 <= u.j && u.j < getSize(G.cells).j
    )
  );
};



const getDistance = (
  G: GameState, player: Player, fromPos: Vector2, toPos: Vector2
): number => {

  const dp: number[][] = G.cells.map(
    (row: Cell[]): number[] => row.map(_ => -1)
  );
  dp[fromPos.i][fromPos.j] = 0;

  const queue: Vector2[] = [fromPos];
  
  while (queue.length > 0) {
    const u: Vector2 = queue.shift() as Vector2;
    getEdges(G, u).forEach((v: Vector2) => {
      if (dp[v.i][v.j] === -1) {
        dp[v.i][v.j] = dp[u.i][u.j] + 1;
        if (isEqual(G.cells[v.i][v.j].owner, player)) {
          queue.push(v);
        }
      }
    });
  }

  return dp[toPos.i][toPos.j];
}



const getBlocks = (G: GameState, player: Player): Block[] => {
  return concat(...G.cells).filter(
    (cell: Cell): boolean => (
      isEqual(cell.owner, player) && cell.block.type !== "Null"
    )
  ).map(
    (cell: Cell): Block => (cell.block as BlockContainer).block
  );
};



export const getProfit = (G: GameState, player: Player): number => {
  return concat(...G.cells).filter(
    (cell: Cell): boolean => isEqual(cell.owner, player)
  ).length + rules.getProfit(getBlocks(G, player));
}



const tryMerge = (
  G: GameState, player: Player,
  block: Block, pos: Vector2, spawn: boolean, doIt: boolean
): boolean => {

  const cell: Cell = G.cells[pos.i][pos.j];

  if (!isEqual(cell.owner, player)) {
    if (!(
      rules.getDistance(block) > 0 &&
      (
        cell.block.type === "Null" ||
        rules.getStrength(cell.block.block) < rules.getStrength(block)
      ) &&
      getEdges(G, pos).filter(
        (u: Vector2): boolean => isEqual(G.cells[u.i][u.j].owner, player)
      ).length > 0 &&
      getEdges(G, pos).filter(
        (u: Vector2): boolean => {
          const uCell: Cell = G.cells[u.i][u.j];
          return (
            isEqual(uCell.owner, cell.owner) &&
            uCell.block.type !== "Null" &&
            rules.getStrength(block) <= rules.getStrength(uCell.block.block)
          );
        }
      ).length == 0
    )) {
      return false;
    }
    if (doIt) {
      cell.owner = cloneDeep(player);
      cell.block = {
        type: "BlockContainer", movable: false, block: cloneDeep(block)
      };
    }
    return true;
  }

  if (cell.block.type === "Null") {
    if (doIt) {
      cell.block = {
        type: "BlockContainer",
        movable: spawn && rules.getDistance(block) > 0,
        block: cloneDeep(block)
      };
    }
    return true;
  }

  const newBlock: Maybe<Block> = rules.merge(cell.block.block, block);

  if (newBlock.type === "Null") {
    return false;
  }

  if (doIt) {
    cell.block.block = newBlock;
  }
  
  return true;
};



export const trySpawn = (
  G: GameState, player: Player,
  block: Block, pos: Vector2, doIt: boolean
): boolean => {

  const cost: number = rules.getCost(getBlocks(G, player), block);

  if (!(
    cost <= G.money[player.name] &&
    tryMerge(G, player, block, pos, true, doIt)
  )) {
    return false;
  }

  if (doIt) {
    G.money[player.name] -= cost;
  }

  return true;
};



export const tryMove = (
  G: GameState, player: Player,
  fromPos: Vector2, toPos: Vector2, doIt: boolean
): boolean => {

  const fromCell: Cell = G.cells[fromPos.i][fromPos.j];

  if (!(
    isEqual(fromCell.owner, player) &&
    fromCell.block.type !== "Null" &&
    fromCell.block.movable
  )) {
    return false;
  }

  const d: number = getDistance(G, player, fromPos, toPos);

  if (!(
    0 <= d && d <= rules.getDistance(fromCell.block.block) &&
    tryMerge(G, player, fromCell.block.block, toPos, false, doIt)
  )) {
    return false;
  }

  if (doIt) {
    fromCell.block = { type: "Null" };
  }

  return true;
};
