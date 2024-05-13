import { Button } from "./styles";

interface IStartButtonProps {
  start: () => void;
}
export default function StartButton({ start }: IStartButtonProps) {
  return <Button onClick={start}>Start Game</Button>;
}
