import React from "react";
import { CellState } from "../YoyGame";
import { CellComponent } from "../CellComponent";

export type FieldProps = {
  cells: CellState[][];
  onClick: (i: number, j: number) => void;
};

export const FieldComponent: React.FC<FieldProps> =
  ({ cells, onClick }) => {

  return (
    <table>
      <tbody>{
        cells.map((row, i) =>
          <tr key={ i }>{
            row.map((cell, j) =>
              <td key={ j }>{
                <CellComponent { ...cell } onClick={ () => onClick(i, j) } />
              }</td>
            )
          }</tr>
        )
      }</tbody>
    </table>
  );
};
