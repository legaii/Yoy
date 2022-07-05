import { Null } from "./Null";
import { Owner } from "../State/Game";

export const playerColor = (player: Null | Owner): string => {
  if (player.type === "Null") {
    return "DarkGray";
  }
  if (player.name === "0") {
    return "DarkCyan";
  }
  return "DarkKhaki";
};
