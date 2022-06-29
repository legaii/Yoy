import React from "react";
import icon from "./Soldier.png";

export interface SoldierComponentProps {
  width: number;
  height: number;
};

export const SoldierComponent: React.FC<SoldierComponentProps> =
  ({ width, height }) => {

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return <img src={ icon } style={ style } />;
};
