import { Client } from "boardgame.io/react";
import { game } from "../../State/Game";
import { BoardComponent } from "../Board";

export const AppComponent = Client({
  game: game,
  board: BoardComponent,
});
