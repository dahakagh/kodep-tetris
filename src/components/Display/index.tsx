import { Container } from "./styles";

interface IDisplayProps {
  gameOver?: boolean;
  text: string;
}

export default function Display({ gameOver = false, text }: IDisplayProps) {
  return (
    <Container isGameOver={gameOver}>
      {gameOver}
      {text}
    </Container>
  );
}
