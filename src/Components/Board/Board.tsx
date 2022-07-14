import React, { useState } from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { isEqual } from "lodash";
import { Vector2 } from "../../Common/Vector2";
import { Null, Maybe } from "../../Common/Null";
import { Player } from "../../Common/Player";
import { Block, blocks } from "../../Common/Block";
import { Cell, GameState } from "../../State/Game";
import { SelectCellComponent } from "../SelectCell";
import { FieldComponent } from "../Field";
import { CellComponent } from "../Cell";



export const BoardComponent =
({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {

  const owner: Player = { type: "Player", name: ctx.currentPlayer };

  const [selectedBlock, setSelectedBlock] =
    useState<Block>({ type: "Null" });
  
  const [selectedPos, setSelectedPos] =
    useState<Null | Vector2>({ type: "Null" });

  return (
  <>
    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <button onClick={ () => moves.endTurn() }>End turn</button>

    <SelectCellComponent
      cells={ [blocks.map((block: Block) => ({ type: "Cell", owner, block }))] }
      selectedCell={{ type: "Cell", owner, block: selectedBlock }}
      listener={ (cell: Maybe<Cell>): void => setSelectedBlock(
        cell.type === "Null" ? { type: "Null" } : cell.block) }
    />

    <FieldComponent
      cells={ G.cells }
      onClick={ (pos: Vector2): void => {
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
    />
  </>);
};
