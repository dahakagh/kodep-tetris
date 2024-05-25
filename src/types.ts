export type Figure = {
  pos: { x: number; y: number };
  shape: (number | string)[][];
  touched: boolean;
};

export type Cell = (number | string)[];
export type BoardRow = Cell[];
export type BoardT = BoardRow[];

export enum CellStatus {
  CLEAR = "clear",
  MERGED = "merged",
}
