import React from "react";
import { isEqual } from "lodash";
import { Maybe } from "../../Common/Null";
import { Block } from "../../Common/Block";
import { JumpingComponent } from "../Jumping";

import iconSoldier1 from "../../Assets/Soldier1.png";
import iconSoldier2 from "../../Assets/Soldier2.png";
import iconSoldier3 from "../../Assets/Soldier3.png";
import iconSoldier4 from "../../Assets/Soldier4.png";
import iconFarm from "../../Assets/Farm.png";
import iconTower2 from "../../Assets/Tower2.png";
import iconTower3 from "../../Assets/Tower3.png";



const getIcon = (block: Maybe<Block>): string => {
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
      return [
        iconTower2,
        iconTower3,
      ][block.level - 2];
  }
};



export interface BlockProps {
  block: Maybe<Block>;
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
