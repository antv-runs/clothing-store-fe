import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";

type InputWithIconProps = {
  iconName: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
  className?: string;
  ariaLabel?: string;
};

export const InputWithIcon = ({
  iconName,
  placeholder,
  type = "text",
  className,
  ariaLabel,
}: InputWithIconProps) => {
  return (
    <div className={className}>
      <figure>
        <Icon svgName={iconName} width={20.25} height={15.75} />
      </figure>
      <Input
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        unstyled
      />
    </div>
  );
};
