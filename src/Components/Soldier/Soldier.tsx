import React from "react";

export interface SoldierProps {
  icon: string;
  width: number;
  height: number;
};

export const SoldierComponent: React.FC<SoldierProps> =
  ({ icon, width, height }) => {

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return <img src={ icon } style={ style } />;
};
