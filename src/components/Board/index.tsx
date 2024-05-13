import { BoardT } from "../../types";
import { Cell } from "../Cell";
import { Container } from "./styles";

interface IBoardProps {
  board: BoardT;
}

export default function Board({ board }: IBoardProps) {
  const width = board[0].length;
  const height = board.length;

  return (
    <Container width={width} height={height}>
      {board.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </Container>
  );
}
