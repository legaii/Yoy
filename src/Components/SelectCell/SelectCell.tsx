import React, { useState } from "react";
import { isEqual } from "lodash";
import { Vector2 } from "../../Common/Vector2";
import { Maybe } from "../../Common/Null";
import { Cell } from "../../State/Game";
import { CellComponent } from "../Cell";



export interface SelectCellProps {
  cells: Cell[][];
  selectedCell: Maybe<Cell>;
  listener: (cell: Maybe<Cell>) => void;
};



export const SelectCellComponent: React.FC<SelectCellProps> =
({ cells, selectedCell, listener }) => (
  <table>
    <tbody>{
      cells.map((row: Cell[], i: number) =>
        <tr key={i}>{
          row.map((cell: Cell, j: number) => {
            const isSelectedCell: boolean = isEqual(cell, selectedCell);
            const selectCell = (): void => listener(
              isSelectedCell ? { type: "Null" } : cell);
            return <td key={j}>
              <CellComponent
                key={i}
                owner={cell.owner}
                block={cell.block}
                brightness={ isSelectedCell ? 125 : 100 }
                onClick={ selectCell }
              />
            </td>;
          })
        }</tr>
      )
    }</tbody>
  </table>
);
