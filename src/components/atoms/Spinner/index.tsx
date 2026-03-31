import "./index.scss";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`spinner ${className || ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="spinner__circle"></div>
    </div>
  );
};
