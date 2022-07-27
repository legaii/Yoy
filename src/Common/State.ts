import { isEqual, cloneDeep, concat, sumBy } from "lodash";
import { Vector2, sum, getSize } from "./Vector2";
import { Null, Maybe } from "./Null";
import { Player } from "./Player";
import { Soldier, Tower, Block } from "./Block";



export interface Cell {
  type: "Cell";
  owner: Maybe<Player>;
  block: Maybe<Block>;
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
    case "Soldier":
      return block.level * 10;
    case "Farm":
      return concat(...G.cells).filter((cell: Cell) => isEqual(cell, {
        type: "Cell",
        owner: player,
        block: { type: "Farm" },
      })).length * 2 + 12;
    case "Tower":
      return (block.level - 1) * 20 - 5;
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
        return [0, 5][cell.block.level - 2];
    }
  }
);



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



const getLevel = (block: Maybe<Block>): number => {
  if (block.type === "Null" || block.type === "Farm") {
    return 0;
  }
  return block.level;
};



const tryMerge = (
  G: GameState, pos: Vector2, cellDelta: Cell, doIt: boolean
): boolean => {

  const cell: Cell = G.cells[pos.i][pos.j];

  if (!isEqual(cell.owner, cellDelta.owner)) {
    if (!(
      cellDelta.block.type === "Soldier" &&
      cellDelta.block.level > getLevel(cell.block) &&
      getEdges(G, pos).filter(
        (u: Vector2): boolean => {
          const uCell: Cell = G.cells[u.i][u.j];
          return (
            isEqual(uCell.owner, cell.owner) &&
            (cellDelta.block as Soldier).level <= getLevel(cell.block)
          );
        }
      ).length == 0
    )) {
      return false;
    }
    if (doIt) {
      cell.owner = cloneDeep(cellDelta.owner);
      cell.block = cloneDeep(cellDelta.block);
    }
    return true;
  }

  if (cell.block.type === "Null") {
    if (doIt) {
      cell.block = cloneDeep(cellDelta.block);
    }
    return true;
  }

  if (cell.block.type !== cellDelta.block.type) {
    return false;
  }

  if (cell.block.type === "Soldier") {
    const level: number = cell.block.level + (cellDelta.block as Soldier).level;
    if (level > 4) {
      return false;
    }
    if (doIt) {
      cell.block.level = level;
    }
    return true;
  }

  if (cell.block.type === "Tower") {
    if (cell.block.level >= (cellDelta.block as Tower).level) {
      return false;
    }
    if (doIt) {
      cell.block.level = (cellDelta.block as Tower).level;
    }
    return true;
  }

  return false;
};



export const trySpawn = (
  G: GameState, player: Player,
  block: Block, pos: Vector2, doIt: boolean
): boolean => {

  block = cloneDeep(block);
  const cell: Cell = { type: "Cell", owner: player, block };
  const cost: number = getCost(G, player, block);
  const target: Cell = G.cells[pos.i][pos.j];

  if (G.money[player.name] < cost) {
    return false;
  }

  if (isEqual(target.owner, player)) {
    if (!tryMerge(G, pos, cell, doIt)) {
      return false;
    }
    if (doIt) {
      G.money[player.name] -= cost;
    }
    return true;
  }

  if (block.type === "Soldier") {
    block.movable = false;
  }

  if (!(
    getEdges(G, pos).filter(
      (u: Vector2): boolean => isEqual(G.cells[u.i][u.j].owner, player)
    ).length > 0 &&
    tryMerge(G, pos, cell, doIt)
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
    fromCell.block.type === "Soldier" &&
    fromCell.block.movable
  )) {
    return false;
  }

  const d: number = getDistance(G, player, fromPos, toPos);

  if (d === -1 || d > 4) {
    return false;
  }

  const fromCellMutable: Cell = doIt ? fromCell : cloneDeep(fromCell);
  (fromCellMutable.block as Soldier).movable = false;

  if (!tryMerge(G, toPos, fromCellMutable, doIt)) {
    return false;
  }

  fromCellMutable.block = { type: "Null" };

  return true;
};
