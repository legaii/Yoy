import { Block } from "./Block";

import iconSoldier1 from "../../Assets/Soldier1.png";
import iconSoldier2 from "../../Assets/Soldier2.png";
import iconSoldier3 from "../../Assets/Soldier3.png";
import iconSoldier4 from "../../Assets/Soldier4.png";

import iconFarm from "../../Assets/Farm.png";

import iconTower2 from "../../Assets/Tower2.png";
import iconTower3 from "../../Assets/Tower3.png";

export const getIcon = (block: Block): string => {
  switch (block.type) {
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
