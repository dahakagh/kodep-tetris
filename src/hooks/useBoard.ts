import { createBoard } from "../utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BoardT, Figure } from "../types";

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

    const cleanRows = (newStage: (string | number)[][][]) =>
      newStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(
            new Array(newStage[0].length).fill([0, "clear"]) as (
              | string
              | number
            )[][]
          );
          return acc;
        }

        acc.push(row);
        return acc;
      }, [] as (string | number)[][][]);

    const updateBoard = (prevStage: (string | number)[][][]) => {
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      figure.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + figure.pos.y][x + figure.pos.x] = [
              value,
              figure.touched ? "merged" : "clear",
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

    setBoard((prev: (string | number)[][][]) => updateBoard(prev));
  }, [figure, resetFigure]);

  return { board, setBoard, rowsCleared };
};
