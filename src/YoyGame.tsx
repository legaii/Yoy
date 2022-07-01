import { Game, Ctx, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Land, lands } from "./Functions/Lands";

export interface CellState {
  owner: null | string;
  land: null | number;
};

export interface Money {
  balance: number;
  profit: number;
};

export interface GameState {
  cells: CellState[][];
  money: {
    [player: string]: Money;
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
    cells[0][1].owner = "0";
    cells[0][2].owner = "0";
    cells[N - 1][N - 1].owner = "1";
    cells[N - 1][N - 2].owner = "1";
    cells[N - 1][N - 3].owner = "1";
    return { cells, money: {
      "0": { balance: 10, profit: 3 },
      "1": { balance: 10, profit: 3 },
    }};
  },

  moves: {
    spawnLand: (G, ctx, landId, i, j) => {
      if (!(G.cells[i][j].owner === ctx.currentPlayer &&
            G.cells[i][j].land === null &&
            G.money[ctx.currentPlayer].balance >= lands[landId].cost)) {
        return INVALID_MOVE;
      }
      G.money[ctx.currentPlayer].balance -= lands[landId].cost;
      G.money[ctx.currentPlayer].profit += lands[landId].profit;
      G.cells[i][j].land = landId;
    },

    endTurn: (G, ctx) => {
      G.money[ctx.currentPlayer].balance += G.money[ctx.currentPlayer].profit;
      ctx.events!.endTurn();
    },
  },
};
