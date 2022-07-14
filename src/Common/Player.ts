import { Null, Maybe } from "./Null";

export interface Player {
  type: "Player";
  name: string;
};

export const playerColor = (player: Maybe<Player>): string => {
  if (player.type === "Null") {
    return "DarkGray";
  }
  if (player.name === "0") {
    return "DarkCyan";
  }
  return "DarkKhaki";
};
