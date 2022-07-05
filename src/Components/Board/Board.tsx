import React, { useState } from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { isEqual } from "lodash";
import { Vector2 } from "../../Common/Vector2";
import { Null } from "../../Common/Null";
import { Block, blocks } from "../../Common/Block";
import { GameState } from "../../State/Game";
import { SelectBlockComponent } from "../SelectBlock";
import { FieldComponent } from "../Field";
import { CellComponent } from "../Cell";



export const BoardComponent =
({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {
  const [selectedBlock, setSelectedBlock] =
    useState<Block>({ type: "Null" });
  
  const [selectedCell, setSelectedCell] =
    useState<Null | Vector2>({ type: "Null" });

  return (
  <>
    <CellComponent
      owner={{ type: "Owner", name: ctx.currentPlayer }}
      block={{ type: "Null" }}
      onClick={ () => {} }
    />

    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <button onClick={ () => moves.endTurn() }>End turn</button>

    <SelectBlockComponent
      blocks={ blocks }
      listener={ (block: Block) => setSelectedBlock(block) }
    />

    <FieldComponent
      cells={ G.cells }
      onClick={ (pos: Vector2): void => {
        if (selectedBlock.type !== "Null") {
          moves.spawn(selectedBlock, pos);
          // setSelectedBlock({ type: "Null" });
          return;
        }
        if (selectedCell.type === "Null") {
          setSelectedCell(pos);
          return;
        }
        if (isEqual(selectedCell, pos)) {
          setSelectedCell({ type: "Null" });
          return;
        }
        moves.move(selectedCell, pos);
        setSelectedCell({ type: "Null" });
      }}
    />
  </>);
};
