import React, { useState } from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { isEqual } from "lodash";
import { Vector2, getSize } from "../../Common/Vector2";
import { Null, Maybe } from "../../Common/Null";
import { Player } from "../../Common/Player";
import { Block, blocks } from "../../Common/Block";
import { getPlayer } from "../../Common/GetPlayer";
import {
  Cell, GameState, getProfit, trySpawn, tryMove
} from "../../Common/State";
import { TableComponent } from "../Table";
import { SelectCellComponent } from "../SelectCell";
import { CellComponent } from "../Cell";



export const BoardComponent =
({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {

  const owner: Player = getPlayer(ctx);

  const [selectedBlock, setSelectedBlock] =
    useState<Block>({ type: "Null" });
  
  const [selectedPos, setSelectedPos] =
    useState<Maybe<Vector2>>({ type: "Null" });

  return (
  <>
    <TableComponent
      size={{ type: "Vector2", i: 3, j: 3}}
      getItem={ (pos: Vector2) => ([
        ["", "Balance", "Profit"],
        ["0", G.money["0"], getProfit(G, { type: "Player", name: "0" })],
        ["1", G.money["1"], getProfit(G, { type: "Player", name: "1" })],
      ][pos.i][pos.j]) }
    />

    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <button onClick={ () => moves.endTurn() }>End turn</button>

    <SelectCellComponent
      cells={ [blocks.map((block: Block) => ({ type: "Cell", owner, block }))] }
      selectedCell={{ type: "Cell", owner, block: selectedBlock }}
      listener={(cell: Maybe<Cell>): void => {
        setSelectedBlock(
          cell.type === "Null" ? { type: "Null" } : cell.block
        );
        setSelectedPos({ type: "Null" });
      }}
    />

    <TableComponent
      size={ getSize(G.cells) }
      getItem={ (pos: Vector2): React.ReactNode => {
        const cell: Cell = G.cells[pos.i][pos.j];
        return <CellComponent
          owner={ cell.owner }
          block={ cell.block }
          jumping={
            isEqual(cell.owner, owner) &&
            cell.block.type === "Soldier" &&
            cell.block.movable
          }
          brightness={
            selectedBlock.type !== "Null" ? (
              trySpawn(G, owner, selectedBlock, pos, false) ? 100 : 50
            ) :
            isEqual(pos, selectedPos) ? 125 :
            (
              selectedPos.type === "Null" ||
              tryMove(G, owner, selectedPos, pos, false)
            ) ? 100 :
            50
          }
          onClick={ (): void => {
            if (selectedBlock.type !== "Null") {
              moves.spawn(selectedBlock, pos);
              setSelectedBlock({ type: "Null" });
              return;
            }
            if (selectedPos.type === "Null") {
              setSelectedPos(pos);
              return;
            }
            if (isEqual(selectedPos, pos)) {
              setSelectedPos({ type: "Null" });
              return;
            }
            moves.move(selectedPos, pos);
            setSelectedPos({ type: "Null" });
          }}
        />;
      }}
    />
  </>);
};
