import { createBoard } from "../utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BoardT, CellStatus, Figure } from "../types";

interface IUseBoardResponse {
  board: BoardT;
  setBoard: Dispatch<SetStateAction<BoardT>>;
  rowsCleared: number;
}

export const useBoard = (
  figure: Figure,
  resetFigure: () => void
): IUseBoardResponse => {
  const [board, setBoard] = useState(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const cleanRows = (newStage: BoardT): BoardT => {
      const clearedStage = newStage.reduce((acc, row) => {
        if (row.every((cell) => cell[0] !== 0)) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(
            new Array(newStage[0].length).fill([0, CellStatus.CLEAR])
          );
        } else {
          acc.push(row);
        }
        return acc;
      }, [] as BoardT);

      return clearedStage;
    };

    const updateBoard = (prevStage: (string | number)[][][]) => {
      const newStage = prevStage.map((row) =>
        row.map((cell) =>
          cell[1] === CellStatus.CLEAR ? [0, CellStatus.CLEAR] : cell
        )
      );

      figure.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + figure.pos.y][x + figure.pos.x] = [
              value,
              figure.touched ? CellStatus.MERGED : CellStatus.CLEAR,
            ];
          }
        });
      });

      if (figure.touched) {
        resetFigure();
        return cleanRows(newStage);
      }

      return newStage;
    };

    setBoard((prev: BoardT) => updateBoard(prev));
  }, [figure, resetFigure]);

  return { board, setBoard, rowsCleared };
};
