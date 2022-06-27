import React from "react";

export interface TableProps {
  cells: React.ReactElement[][];
};

export const TableComponent: React.FC<TableProps> = ({ cells }) => (
  <table>
    <tbody> {
        cells.map((row, i) =>
          <tr key={i}> {
            row.map((cell, j) =>
              <td key={j}> { cell } </td>
            )
          } </tr>
        )
    } </tbody>
  </table>
);
