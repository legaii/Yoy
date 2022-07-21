import React from "react";
import { isEqual } from "lodash";
import { Block } from "../../Common/Block";
import { JumpingComponent } from "../Jumping";

import iconSoldier1 from "../../Assets/Soldier1.png";
import iconSoldier2 from "../../Assets/Soldier2.png";
import iconSoldier3 from "../../Assets/Soldier3.png";
import iconSoldier4 from "../../Assets/Soldier4.png";
import iconFarm from "../../Assets/Farm.png";
import iconTower from "../../Assets/Tower.png";



const getIcon = (block: Block): string => {
  switch (block.type) {
    case "Null":
      return "";
    case "Soldier":
      return [
        iconSoldier1, iconSoldier2,
        iconSoldier3, iconSoldier4,
      ][block.level - 1];
    case "Farm":
      return iconFarm;
    case "Tower":
      return iconTower;
  }
};



export interface BlockProps {
  block: Block;
  width: number;
  height: number;
  jumping?: boolean;
};



export const BlockComponent: React.FC<BlockProps> = (
  { block, width, height, jumping }
) => {

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const img: React.ReactNode = <img src={ getIcon(block) } style={ style } />;

  if (jumping) {
    return <JumpingComponent delta={-5}>{img}</JumpingComponent>;
  }

  return img;
};
