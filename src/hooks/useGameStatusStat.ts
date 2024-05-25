import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IUseGameStatusResponse {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
}

export const useGameStatusStat = (
  rowsCleared: number
): IUseGameStatusResponse => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return { score, setScore, rows, setRows, level, setLevel };
};
