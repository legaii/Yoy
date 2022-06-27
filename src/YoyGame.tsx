import type { Game, Move } from "boardgame.io";

export interface Soldier {};

export interface CellState {
  owner: null | string;
  land: null | Soldier;
};

export interface GameState {
  N: number;
  cells: CellState[][];
};

export const YoyGame: Game<GameState> = {
  setup: () => {
    const N: number = 10;
    return {
      N: N,
      cells: new Array(N).fill(null).map(_ =>
        new Array(N).fill(null).map(_ =>
          ({ owner: null, land: null })
        )
      ),
    };
  },
};
