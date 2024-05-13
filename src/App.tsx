import { KeyboardEvent, useState } from "react";
import { useFigure } from "./hooks/useFigure";
import { useBoard } from "./hooks/useBoard";
import { useGameStatus } from "./hooks/useGameStatus";
import { isTouched, createBoard } from "./utils";
import { useInterval } from "./hooks/useInterval";
import StartButton from "./components/StartButton";
import Display from "./components/Display";
import styled from "styled-components";
import Board from "./components/Board";

export default function App() {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { figure, updateFigurePos, resetFigure, figureRotate } = useFigure();
  const { board, setBoard, rowsCleared } = useBoard(figure, resetFigure);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isTouched(figure, board, { x: dir, y: 0 })) {
      updateFigurePos({ x: dir, y: 0, touched: false });
    }
  };

  const startGame = () => {
    setBoard(createBoard());
    setDropTime(1000);
    resetFigure();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!isTouched(figure, board, { x: 0, y: 1 })) {
      updateFigurePos({ x: 0, y: 1, touched: false });
    } else {
      console.log(figure);

      if (figure.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }

      updateFigurePos({ x: 0, y: 0, touched: true });
    }
  };

  const keyUp = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowLeft") {
        movePlayer(-1);
      } else if (key === "ArrowUp") {
        figureRotate(board, 1);
      } else if (key === "ArrowRight") {
        movePlayer(1);
      } else if (key === "ArrowDown") {
        dropPlayer();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <Container tabIndex={0} role={"button"} onKeyUp={keyUp} onKeyDown={move}>
      <Board board={board} />
      <Statistic>
        {gameOver ? (
          <Display gameOver={gameOver} text={"Game Over"} />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
          </div>
        )}
        <StartButton start={startGame} />
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
`;

const Statistic = styled.aside`
  display: block;
  width: 100%;
  max-width: 200px;
  margin-left: 20px;
`;
