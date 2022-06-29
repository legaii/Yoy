import React from "react";
import { CellState } from "../YoyGame";
import { playerColor } from "../PlayerColor";
import { SoldierComponent } from "../SoldierComponent";

export type CellComponentProps = CellState & {
  onClick: () => void;
};

export const CellComponent: React.FC<CellComponentProps> =
  ({ owner, land, onClick }) => {

  const style = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    background: playerColor(owner),
  };

  return (
    <div style={ style } onClick={ onClick } >
      { land === null ? <></> : <SoldierComponent width={ 44 } height={ 44 } /> }
    </div>
  );
};
