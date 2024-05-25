import { BOARD_WIDTH, randomShape, SHAPES } from "../constants";
import { useCallback, useState } from "react";
import { isTouched } from "../utils";
import { BoardT, Figure } from "../types";

type UpdateTetPositionParams = {
  x: number;
  y: number;
  touched: boolean;
};

interface IUsePlayerResponse {
  figure: Figure;
  updateTetPosition: (params: UpdateTetPositionParams) => void;
  resetFigure: () => void;
  figureRotate: (stage: BoardT) => void;
}

export const useFigure = (): IUsePlayerResponse => {
  const [figure, setFigure] = useState<Figure>({
    pos: { x: 0, y: 0 },
    shape: SHAPES[0].shape,
    touched: false,
  });

  const rotateMatrix = (matrix: (string | number)[][]) => {
    const transposedMatrix = matrix.map((_item, index) =>
      matrix.map((column) => column[index])
    );

    return transposedMatrix.map((row) => row.reverse());
  };

  const figureRotate = (stage: BoardT) => {
    const clonedFigure = JSON.parse(JSON.stringify(figure));
    clonedFigure.shape = rotateMatrix(clonedFigure.shape);

    const pos = clonedFigure.pos.x;
    let offset = 1;

    while (isTouched(clonedFigure, stage, { x: 0, y: 1 })) {
      clonedFigure.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedFigure.shape[0].length) {
        clonedFigure.pos.x = pos;
        return;
      }
    }

    setFigure(clonedFigure);
  };

  const updateTetPosition = ({ x, y, touched }: UpdateTetPositionParams) => {
    setFigure((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      touched,
    }));
  };

  const resetFigure = useCallback(() => {
    setFigure({
      pos: { x: BOARD_WIDTH / 2 - 1, y: 0 },
      shape: randomShape().shape,
      touched: false,
    });
  }, []);

  return { figure, updateTetPosition, resetFigure, figureRotate };
};
