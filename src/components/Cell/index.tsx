import { ReactElement, memo, CSSProperties } from "react";
import { SHAPES } from "../../constants";

interface ICellProps {
  type: string | number;
}

const getCellStyle = (type: string | number): CSSProperties => {
  const color = SHAPES[type].color;
  return {
    background: `rgba(${color}, 0.8)`,
    border: `${type === 0 ? "0px solid" : "4px solid"}`,
    borderBottomColor: `rgba(${color}, 0.1)`,
    borderRightColor: `rgba(${color}, 1)`,
    borderTopColor: `rgba(${color}, 1)`,
    borderLeftColor: `rgba(${color}, 0.3)`,
  };
};

const Cell = ({ type }: ICellProps): ReactElement => {
  return <div style={getCellStyle(type)} />;
};

const MemoizedCell = memo(Cell);

export { MemoizedCell as Cell };
