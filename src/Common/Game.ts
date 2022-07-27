import { Game, Ctx, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { isEqual, cloneDeep, concat } from "lodash";
import { Vector2, sum } from "./Vector2";
import { Block } from "./Block";
import {
  Cell, GameState, getCost, getProfit, trySpawn, tryMove
} from "./State";
import { getPlayer } from "./GetPlayer";



export const game: Game<GameState> = {
  setup: () => {
    const N: number = 10;
    const cells: Cell[][] = new Array(N).fill(null).map(_ =>
      new Array(N).fill(null).map(_ =>
        ({ type: "Cell", owner: { type: "Null" }, block: { type: "Null" } })
      )
    );
    [0, 1, 2].forEach((i: number) => {
      cells[0][i].owner = { type: "Player", name: "0" };
      cells[N - 1][N - i - 1].owner = { type: "Player", name: "1" };
    });
    return { type: "GameState", cells, money: { "0": 10, "1": 10 } };
  },

  moves: {
    spawn: (G, ctx, block: Block, pos: Vector2) => {
      if (!trySpawn(G, getPlayer(ctx), block, pos, true)) {
        return INVALID_MOVE;
      }
    },

    move: (G, ctx, fromPos: Vector2, toPos: Vector2) => {
      if (!tryMove(G, getPlayer(ctx), fromPos, toPos, true)) {
        return INVALID_MOVE;
      }
    },

    endTurn: (G, ctx) => {
      G.cells.forEach(
        (row: Cell[]): void => row.forEach(
          (cell: Cell): void => {
            if (cell.block.type === "Soldier") {
              cell.block.movable = true;
            }
          }
        )
      );
      G.money[ctx.currentPlayer] += getProfit(G, getPlayer(ctx));
      ctx.events!.endTurn();
    },
  },
};
