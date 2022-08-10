import React from "react";
import { playerColor } from "../../Common/Player";
import { Cell } from "../../Common/State";
import { BlockComponent } from "../Block";

export interface CellProps {
  cell: Cell;
  brightness?: number;
  onClick: () => void;
};

export const CellComponent: React.FC<CellProps> =
  ({ cell, brightness, onClick }) => {

  const style = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    background: playerColor(cell.owner),
    filter: `brightness(${brightness}%)`,
  };

  return (
    <div style={ style } onClick={ onClick } >
      { cell.block.type === "Null" ? <></> :
        <BlockComponent
          block={ cell.block }
          width={ 44 }
          height={ 44 }
        />
      }
    </div>
  );
};
