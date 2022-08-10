import React, { useState } from "react";
import { isEqual } from "lodash";
import { Vector2, getSize } from "../../Common/Vector2";
import { Maybe } from "../../Common/Null";
import { Cell } from "../../Common/State";
import { TableComponent } from "../Table";
import { CellComponent } from "../Cell";



export interface SelectCellProps {
  cells: Cell[][];
  selectedCell: Maybe<Cell>;
  listener: (cell: Maybe<Cell>) => void;
};



export const SelectCellComponent: React.FC<SelectCellProps> = (
  { cells, selectedCell, listener }
) => (<TableComponent
  size={ getSize(cells) }
  getItem={ (pos: Vector2) => {
    const cell: Cell = cells[pos.i][pos.j];
    const isSelectedCell: boolean = isEqual(cell, selectedCell);
    const selectCell = (): void => listener(
      isSelectedCell ? { type: "Null" } : cell);
    return <CellComponent
      cell={ cell }
      brightness={ isSelectedCell ? 125 : 100 }
      onClick={ selectCell }
    />;
  }}
/>);
