type BadgeProps = {
  text: string;
};

export function Badge({ text }: BadgeProps) {
  return <span>{text}</span>;
}
