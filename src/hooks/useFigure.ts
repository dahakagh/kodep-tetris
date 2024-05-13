import { BOARD_WIDTH, randomShape, SHAPES } from "../constants";
import { useCallback, useState } from "react";
import { isTouched } from "../utils";
import { BoardT, Figure } from "../types";

type UpdateFigurePosParams = {
  x: number;
  y: number;
  touched: boolean;
};

interface IUsePlayerResponse {
  figure: Figure;
  updateFigurePos: (params: UpdateFigurePosParams) => void;
  resetFigure: () => void;
  figureRotate: (stage: BoardT, dir: number) => void;
}

export const useFigure = (): IUsePlayerResponse => {
  const [figure, setFigure] = useState<Figure>({
    pos: { x: 0, y: 0 },
    shape: SHAPES[0].shape,
    touched: false,
  });

  const rotate = (matrix: (string | number)[][], dir: number) => {
    const rotatedShape = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    if (dir > 0) {
      return rotatedShape.map((row) => row.reverse());
    }
  };

  const figureRotate = (stage: BoardT, dir: number) => {
    const clonedFigure = JSON.parse(JSON.stringify(figure));
    clonedFigure.shape = rotate(clonedFigure.shape, dir);

    const pos = clonedFigure.pos.x;
    let offset = 1;

    while (isTouched(clonedFigure, stage, { x: 0, y: 1 })) {
      clonedFigure.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedFigure.shape[0].length) {
        rotate(clonedFigure.shape, -dir);
        clonedFigure.pos.x = pos;
        return;
      }
    }

    setFigure(clonedFigure);
  };

  const updateFigurePos = ({ x, y, touched }: UpdateFigurePosParams) => {
    setFigure((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      touched,
    }));
  };

  const resetFigure = useCallback(() => {
    setFigure({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      shape: randomShape().shape,
      touched: false,
    });
  }, []);

  return { figure, updateFigurePos, resetFigure, figureRotate };
};
