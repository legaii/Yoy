import type { Game, Move } from "boardgame.io";

export interface Soldier {};

export interface CellState {
  owner: null | string;
  land: null | Soldier;
};

export interface GameState {
  cells: CellState[][];
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
    return { cells };
  },
};
