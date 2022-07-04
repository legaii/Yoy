import React from "react";
import { Cell } from "../../State/Game";
import { CellComponent } from "../Cell";
import { Vector2 } from "../../Common/Vector2";

export type FieldProps = {
  cells: Cell[][];
  onClick: (pos: Vector2) => void;
};

export const FieldComponent: React.FC<FieldProps> =
  ({ cells, onClick }) => {

  return (
    <table>
      <tbody>{
        cells.map((row, i) =>
          <tr key={i}>{
            row.map((cell, j) =>
              <td key={j}>{
                <CellComponent { ...cell } onClick={ () => onClick({i, j}) } />
              }</td>
            )
          }</tr>
        )
      }</tbody>
    </table>
  );
};
