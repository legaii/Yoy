import React from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./YoyGame";
import { TableComponent } from "./TableComponent";
import { CellComponent } from "./CellComponent";
import { playerColor } from "./PlayerColor";

interface SpawnSoldierMode {};

interface MoveSoldierMode {
  i: number;
  j: number;
};

type Mode = null | SpawnSoldierMode | MoveSoldierMode;

export const YoyBoard =
  ({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {
  return <>
    <TableComponent cells={
      Object.entries(G.money).map(([player, balance]) => [
        <span>{ player }</span>, <span>{ balance }</span>])
    } />
    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <h3>Current player:<br/><br/><CellComponent owner={ ctx.currentPlayer } land={ null } onClick={ () => {} } /></h3>
    <TableComponent cells={
      G.cells.map((row, i) =>
        row.map((cell, j) =>
          <CellComponent {...cell} onClick={ () => moves.spawnSoldier(i, j) } />
        )
      )
    } />
  </>;
};
