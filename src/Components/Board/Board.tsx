import React, { useState } from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../../State/Game";
import { FieldComponent } from "../Field";
import { CellComponent } from "../Cell";
import { Vector2 } from "../../Common/Vector2";



export const BoardComponent =
  ({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {

  return <>
    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <button onClick={ () => moves.endTurn() }>End turn</button>

    <h3>
      Current player:<br/><br/>
      <CellComponent
        owner={{ type: "Owner", name: ctx.currentPlayer }}
        block={{type: "Null"}}
        onClick={ () => {} }
      />
    </h3>

    <FieldComponent
      cells={ G.cells }
      onClick={ (pos: Vector2) => moves.spawn({ type: "Null" }, pos) }
    />
  </>;
};
