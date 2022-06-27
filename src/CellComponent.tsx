import React from "react";
import { CellState } from "./YoyGame";
import { playerColor } from "./PlayerColor";

export const CellComponent: React.FC<CellState> = ({ owner, land }) => {

  const style = {
    width: "50px",
    height: "50px",
    background: playerColor(owner),
  };

  return <div style={ style }></div>
};
