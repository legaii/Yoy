import React, { useState } from "react";
import { Ctx } from "boardgame.io";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./YoyGame";
import { FieldComponent } from "./FieldComponent";
import { CellComponent } from "./CellComponent";
import { Land, lands } from "./Functions/Lands";



export const YoyBoard =
  ({ G, ctx, moves, undo, redo }: BoardProps<GameState>) => {

  const [landId, setLandId] = useState<null | number>(null);

  type Vector2 = { i: number; j: number; };
  const [selectedSoldier, setSelectedSoldier] =
    useState<null | Vector2>(null);

  return <>
    <button onClick={ undo }>Undo</button>
    <button onClick={ redo }>Redo</button>
    <button onClick={ () => moves.endTurn() }>End turn</button>

    { lands.map(({ icon }, i) =>
      <CellComponent
        key={ i }
        owner={ null }
        land={ i }
        brightness={ i === landId ? 125 : 100 }
        onClick={ () => setLandId(i === landId ? null : i) }
      />
    )}

    <h3>
      Current player:<br/><br/>
      <CellComponent
        owner={ ctx.currentPlayer }
        land={ null }
        onClick={ () => {} }
      />
    </h3>

    <FieldComponent
      cells={ G.cells }
      onClick={ (i, j) => moves.spawnLand(landId, i, j) }
    />
  </>;
};
