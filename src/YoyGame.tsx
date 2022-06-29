import type { Game, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

export interface Soldier {};

export interface CellState {
  owner: null | string;
  land: null | Soldier;
};

export interface GameState {
  cells: CellState[][];
  money: {
    [player: string]: number;
  };
};

export const YoyGame: Game<GameState> = {
  setup: () => {
    const N: number = 10;
    const cells = new Array(N).fill(null).map(_ =>
      new Array(N).fill(null).map(_ =>
        ({ owner: null, land: null } as CellState)
      )
    );
    cells[0][0].owner = "0";
    cells[N - 1][N - 1].owner = "1";
    return { cells, money: {"0": 10, "1": 10} };
  },

  moves: {
    spawnSoldier: (G, ctx, i, j) => {
      if (!(G.cells[i][j].owner === ctx.currentPlayer &&
            G.cells[i][j].land === null &&
            G.money[ctx.currentPlayer] >= 10)) {
        return INVALID_MOVE;
      }
      G.money[ctx.currentPlayer] -= 10;
      G.cells[i][j].land = {} as Soldier;
    },
  },
};
