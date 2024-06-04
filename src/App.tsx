import { KeyboardEvent, useRef, useState } from "react";
import { useFigure } from "./hooks/useFigure";
import { useBoard } from "./hooks/useBoard";
import { useGameStatusStat } from "./hooks/useGameStatusStat";
import { isTouched, createBoard } from "./utils";
import { useInterval } from "./hooks/useInterval";
import styled from "styled-components";
import Board from "./components/Board";

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dropTimeInterval, setDropTimeInterval] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { figure, updateTetPosition, resetFigure, figureRotate } = useFigure();
  const { board, setBoard, rowsCleared } = useBoard(figure, resetFigure);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatusStat(rowsCleared);

  const moveFigure = (direction: "left" | "right") => {
    const dirToCoord = direction === "left" ? -1 : 1;

    if (!isTouched(figure, board, { x: dirToCoord, y: 0 })) {
      updateTetPosition({ x: dirToCoord, y: 0, touched: false });
    }
  };

  const startGame = () => {
    const node = containerRef.current;
    node?.focus();

    setBoard(createBoard());
    setDropTimeInterval(1000);
    resetFigure();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const dropFigureBySpeedUpInterval = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTimeInterval(1000 / (level + 1) + 200);
    }

    if (!isTouched(figure, board, { x: 0, y: 1 })) {
      updateTetPosition({ x: 0, y: 1, touched: false });
    } else {
      if (figure.pos.y < 2) {
        setGameOver(true);
        setDropTimeInterval(null);
      }

      updateTetPosition({ x: 0, y: 0, touched: true });
    }
  };

  const keyUp = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTimeInterval(1000 / (level + 1) + 200);
      }
    }
  };

  const dropFigure = () => {
    setDropTimeInterval(null);
    dropFigureBySpeedUpInterval();
  };

  const move = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowLeft") {
        moveFigure("left");
      } else if (key === "ArrowUp") {
        figureRotate(board);
      } else if (key === "ArrowRight") {
        moveFigure("right");
      } else if (key === "ArrowDown") {
        dropFigure();
      }
    }
  };

  useInterval(() => {
    dropFigureBySpeedUpInterval();
  }, dropTimeInterval);

  return (
    <Container ref={containerRef} tabIndex={0} onKeyUp={keyUp} onKeyDown={move}>
      <Board board={board} />
      <Statistic>
        {gameOver ? (
          <TextField isGameOver={gameOver}>Game Over</TextField>
        ) : (
          <>
            <TextField>Score: {score}</TextField>
            <TextField>Rows: {rows}</TextField>
            <TextField>Level: {level}</TextField>
          </>
        )}
        <Button onClick={startGame}>Start Game</Button>
      </Statistic>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  width: 100%;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Statistic = styled.aside`
  display: block;
  width: 100%;
  max-width: 200px;
  margin-left: 20px;
`;

const TextField = styled.div<{ isGameOver?: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  background-color: #000;
  color: ${(props) => (props.isGameOver ? "red" : "#999")};
`;

export const Button = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
