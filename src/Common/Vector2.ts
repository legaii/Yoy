export interface Vector2 {
  type: "Vector2";
  i: number;
  j: number;
};

export const sum = (a: Vector2, b: Vector2): Vector2 =>
  ({ type: "Vector2", i: a.i + b.i, j: a.j + b.j });
