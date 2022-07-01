export const playerColor = (player: null | string): string => {
  if (player === "0") {
    return "DarkCyan";
  }
  if (player === "1") {
    return "DarkKhaki";
  }
  return "DarkGray";
};
