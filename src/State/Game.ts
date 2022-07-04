import { Game, Ctx, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { isEqual, cloneDeep, concat, sumBy } from "lodash";
import { Vector2 } from "../Common/Vector2";

export interface Null {
  type: "Null";
};

export interface Owner {
  type: "Owner";
  name: string;
};

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

export interface Cell {
  type: "Cell";
  owner: Null | Owner;
  block: Block;
};

export interface GameState {
  type: "GameState";
  cells: Cell[][];
  money: {
    [player: string]: number;
  };
};



export const getCost = (G: GameState, ctx: Ctx, block: Block): number => {
  switch (block.type) {
    case "Null":
      return 0;
    case "Soldier":
      return block.level * 10;
    case "Farm":
      return concat(...G.cells).filter((cell: Cell) => isEqual(cell, {
        type: "Cell",
        owner: { type: "Owner", name: ctx.currentPlayer },
        block: { type: "Farm" },
      })).length * 2 + 12;
    case "Tower":
      return 15;
  }
};

export const getProfit = (G: GameState, ctx: Ctx): number =>
  sumBy(concat(...G.cells), (cell: Cell) => {
    if (!isEqual(cell.owner, { type: "Owner", name: ctx.currentPlayer })) {
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
  });

export const getDistance =
(G: GameState, ctx: Ctx, fromPos: Vector2, toPos: Vector2): number => {
  const dp: number[][] = G.cells.map((row: Cell[]): number[] =>
    row.map(_ => -1));

  const dfs = (u: Vector2): void =>
    ([[0, 1], [0, -1], [1, 0], [-1, 0]]).map(([i, j]) => ({i, j})).forEach(
    (d: Vector2): void => {
      const v: Vector2 = { i: u.i + d.i, j: u.j + d.j };
      if (0 <= v.i && v.i < G.cells.length &&
          0 <= v.j && v.j < G.cells[v.i].length &&
          dp[v.i][v.j] === -1) {
        dp[v.i][v.j] = dp[u.i][u.j] + 1;
        dfs(v);
      }
    });
  
  dp[fromPos.i][fromPos.j] = 0;
  dfs(fromPos);

  return dp[toPos.i][toPos.j];
}



export const game: Game<GameState> = {
  setup: () => {
    const N: number = 10;
    const cells: Cell[][] = new Array(N).fill(null).map(_ =>
      new Array(N).fill(null).map(_ =>
        ({ type: "Cell", owner: { type: "Null" }, block: { type: "Null" } })
      )
    );
    [0, 1, 2].forEach((i: number) => {
      cells[0][i].owner = { type: "Owner", name: "0" };
      cells[N - 1][N - i - 1].owner = { type: "Owner", name: "1" };
    });
    return { type: "GameState", cells, money: { "0": 10, "1": 10 } };
  },

  moves: {
    spawn: (G, ctx, block: Block, pos: Vector2) => {
      const cost: number = getCost(G, ctx, block);
      const target: Cell = G.cells[pos.i][pos.j];
      if (!(isEqual(target.owner, { type: "Owner", name: ctx.currentPlayer }) &&
            isEqual(target.block, { type: "Null" }) &&
            G.money[ctx.currentPlayer] >= cost)) {
        return INVALID_MOVE;
      }
      G.money[ctx.currentPlayer] -= cost;
      target.block = cloneDeep(block);
    },

    move: (G, ctx, fromPos: Vector2, toPos: Vector2) => {
      const fromCell: Cell = G.cells[fromPos.i][fromPos.j];
      const toCell: Cell = G.cells[toPos.i][toPos.j];
      if (!(isEqual(fromCell.owner, { type: "Owner", name: ctx.currentPlayer }) &&
            fromCell.block.type === "Soldier")) {
        return INVALID_MOVE;
      }
      if (isEqual(toCell.owner, fromCell.owner)) {
        if (toCell.block.type !== "Null") {
          return INVALID_MOVE;
        }
      } else {
        if ((toCell.block.type === "Soldier" || toCell.block.type === "Tower") &&
            toCell.block.level >= fromCell.block.level) {
          return INVALID_MOVE;
        }
      }
      const d: number = getDistance(G, ctx, fromPos, toPos);
      if (d === -1 || d > 4) {
        return INVALID_MOVE;
      }
      G.cells[toPos.i][toPos.j] = cloneDeep(fromCell);
      fromCell.block = { type: "Null" };
    },

    endTurn: (G, ctx) => {
      G.money[ctx.currentPlayer] += getProfit(G, ctx);
      ctx.events!.endTurn();
    },
  },
};
