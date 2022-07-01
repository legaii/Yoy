import React from "react";
import { CellState } from "../YoyGame";
import { playerColor } from "../Functions/PlayerColor";
import { SoldierComponent } from "../SoldierComponent";
import { Land, lands } from "../Functions/Lands";

export interface CellProps extends CellState {
  brightness?: number;
  onClick: () => void;
};

export const CellComponent: React.FC<CellProps> =
  ({ owner, land, brightness, onClick }) => {

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
      { land === null ? <></> :
        <SoldierComponent
          icon={ lands[land].icon }
          width={ 44 }
          height={ 44 }
        />
      }
    </div>
  );
};
