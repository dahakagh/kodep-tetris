import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";
import { BoardT, Figure } from "./types";

export const createBoard = (): BoardT =>
  Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill([0, "clear"])
  );

export const isTouched = (
  figure: Figure,
  stage: BoardT,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < figure.shape.length; y += 1) {
    for (let x = 0; x < figure.shape[y].length; x += 1) {
      if (figure.shape[y][x] !== 0) {
        if (
          !stage[y + figure.pos.y + moveY] ||
          !stage[y + figure.pos.y + moveY][x + figure.pos.x + moveX] ||
          stage[y + figure.pos.y + moveY][x + figure.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
