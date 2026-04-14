import clsx from "clsx";
import "./index.scss";

type SpinnerProps = {
  className?: string;
  id?: string;
};

/**
 * Spinner atom - Strict implementation for loading indicators.
 */
export const Spinner = ({ className, id }: SpinnerProps) => {
  return (
    <div
      id={id}
      className={clsx("spinner", className)}
      role="status"
      aria-live="polite"
    >
      <div className="spinner__circle" />
    </div>
  );
};
