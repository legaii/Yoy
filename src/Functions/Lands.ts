import soldier1 from "../Assets/Soldier1.png";
import soldier2 from "../Assets/Soldier2.png";
import soldier3 from "../Assets/Soldier3.png";
import soldier4 from "../Assets/Soldier4.png";
import farm from "../Assets/Farm.png";

export interface Land {
  cost: number;
  profit: number;
  soldierLevel: number;
  icon: string;
};

export const lands: Land[] = [
  {
    cost: 10,
    profit: -2,
    soldierLevel: 1,
    icon: soldier1,
  },
  {
    cost: 20,
    profit: -6,
    soldierLevel: 2,
    icon: soldier2,
  },
  {
    cost: 30,
    profit: -18,
    soldierLevel: 3,
    icon: soldier3,
  },
  {
    cost: 40,
    profit: -36,
    soldierLevel: 4,
    icon: soldier4,
  },
  {
    cost: 5,
    profit: 4,
    soldierLevel: 0,
    icon: farm,
  },
];
