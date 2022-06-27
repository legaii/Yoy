import React from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./YoyGame";
import { TableComponent } from "./TableComponent";
import { CellComponent } from "./CellComponent";

export const YoyBoard = ({ G, ctx, moves }: BoardProps<GameState>) => {
  return <TableComponent cells={
    G.cells.map(row =>
      row.map(cell =>
        <CellComponent {...cell} />
      )
    )
  }/>;
};
