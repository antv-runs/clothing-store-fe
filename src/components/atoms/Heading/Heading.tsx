type HeadingProps = {
  title: string;
  subtitle?: string;
};

export function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
