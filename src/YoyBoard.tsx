import React from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./YoyGame";
import { TableComponent } from "./TableComponent";
import { CellComponent } from "./CellComponent";
import { playerColor } from "./PlayerColor";

export const YoyBoard = ({ G, ctx, moves }: BoardProps<GameState>) => {
  return <>
    <h3>Current player:<br/><br/><CellComponent owner={ ctx.currentPlayer } land={ null } /></h3>
    <TableComponent cells={
      G.cells.map(row =>
        row.map(cell =>
          <CellComponent {...cell} />
        )
      )
    }/>
  </>;
};
