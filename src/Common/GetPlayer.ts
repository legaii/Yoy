import { Ctx } from "boardgame.io";
import { Player } from "./Player";

export const getPlayer = (ctx: Ctx): Player => (
  { type: "Player", name: ctx.currentPlayer }
);
