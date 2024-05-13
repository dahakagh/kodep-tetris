import { ReactElement, memo } from "react";
import { SHAPES } from "../../constants";

interface ICellProps {
  type: string | number;
}

const MemoizedCell = memo(function Cell({ type }: ICellProps): ReactElement {
  return (
    <div
      style={{
        background: `rgba(${SHAPES[type].color}, 0.8)`,
        border: `${type === 0 ? "0px solid" : "4px solid"}`,
        borderBottomColor: `rgba(${SHAPES[type].color}, 0.1)`,
        borderRightColor: `rgba(${SHAPES[type].color}, 1)`,
        borderTopColor: `rgba(${SHAPES[type].color}, 1)`,
        borderLeftColor: `rgba(${SHAPES[type].color}, 0.3)`,
      }}
    />
  );
});

export { MemoizedCell as Cell };
