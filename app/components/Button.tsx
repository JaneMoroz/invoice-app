"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  ariaLabel?: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  grey?: boolean;
  purple?: boolean;
  red?: boolean;
  darkGrey?: boolean;
  stretch?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  label,
  onClick,
  disabled,
  icon: Icon,
  grey,
  purple,
  red,
  darkGrey,
  stretch,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-4 text-xs font-bold capitalize rounded-full transition
        ${red && "text-white bg-[#ec5757] hover:bg-[#FF9797]"}
        ${purple && "text-white bg-[#7C5DFA] hover:bg-[#9277FF]"}
        ${
          grey &&
          "text-[#7E88C3] dark:text-[#DFE3FA] bg-defaultBg hover:bg-defaultHoverBg"
        }
        ${darkGrey && "text-secondary bg-grey hover:bg-greyHover"}
        ${stretch && "w-full"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
