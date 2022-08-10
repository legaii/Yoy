import type { Block } from "./Block";
import { blocks } from "./Block";
import { getIcon } from "./GetIcon";
import { getCost } from "./GetCost";
import { getProfit } from "./GetProfit";
import { getStrength } from "./GetStrength";
import { getDistance } from "./GetDistance";
import { merge } from "./Merge";

import { Rules } from "../Rules";

export { Block };

export const rules: Rules<Block> = {
  blocks, getIcon, getCost, getProfit, getStrength, getDistance, merge
};
