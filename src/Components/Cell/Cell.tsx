import React from "react";
import { Cell } from "../../State/Game";
import { playerColor } from "../../Common/PlayerColor";
import { BlockComponent } from "../Block";

export interface CellProps {
  owner: Cell["owner"];
  block: Cell["block"];
  brightness?: number;
  onClick: () => void;
};

export const CellComponent: React.FC<CellProps> =
  ({ owner, block, brightness, onClick }) => {

  const style = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    background: playerColor(owner),
    filter: `brightness(${brightness}%)`,
  };

  return (
    <div style={ style } onClick={ onClick } >
      { block.type === "Null" ? <></> :
        <BlockComponent
          block={ block }
          width={ 44 }
          height={ 44 }
        />
      }
    </div>
  );
};
