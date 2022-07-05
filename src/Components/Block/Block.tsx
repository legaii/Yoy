import React from "react";
import { isEqual } from "lodash";
import { Block } from "../../Common/Block";

import iconSoldier1 from "../../Assets/Soldier1.png";
import iconSoldier2 from "../../Assets/Soldier2.png";
import iconSoldier3 from "../../Assets/Soldier3.png";
import iconSoldier4 from "../../Assets/Soldier4.png";
import iconFarm from "../../Assets/Farm.png";
import iconTower from "../../Assets/Tower.png";



const getIcon = (block: Block): string => {
  if (isEqual(block, { type: "Soldier", level: 1 })) {
    return iconSoldier1;
  }
  if (isEqual(block, { type: "Soldier", level: 2 })) {
    return iconSoldier2;
  }
  if (isEqual(block, { type: "Soldier", level: 3 })) {
    return iconSoldier3;
  }
  if (isEqual(block, { type: "Soldier", level: 4 })) {
    return iconSoldier4;
  }
  if (isEqual(block, { type: "Farm" })) {
    return iconFarm;
  }
  if (isEqual(block, { type: "Tower", level: 2 })) {
    return iconTower;
  }
  return "";
};



export interface BlockProps {
  block: Block;
  width: number;
  height: number;
};



export const BlockComponent: React.FC<BlockProps> =
  ({ block, width, height }) => {

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return <img src={ getIcon(block) } style={ style } />;
};
