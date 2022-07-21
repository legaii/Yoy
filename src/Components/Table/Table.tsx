import React from "react";
import { range } from "lodash";
import { Vector2 } from "../../Common/Vector2";

export interface TableProps {
  size: Vector2;
  getItem: (pos: Vector2) => React.ReactNode;
};

export const TableComponent: React.FC<TableProps> = (
  { size, getItem }
) => (
  <table>
    <tbody>{
      range(size.i).map((i: number) =>
        <tr key={i}>{
          range(size.j).map((j: number) =>
            <td key={j}>
              { getItem({ type: "Vector2", i, j }) }
            </td>
          )
        }</tr>
      )
    }</tbody>
  </table>
);
