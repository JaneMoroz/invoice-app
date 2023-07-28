"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  ariaLabel?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  base?: boolean;
  grey?: boolean;
  purple?: boolean;
  red?: boolean;
  darkGrey?: boolean;
  customGrey?: boolean;
  stretch?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  label,
  type,
  onClick,
  disabled,
  icon: Icon,
  base,
  grey,
  purple,
  red,
  darkGrey,
  customGrey,
  stretch,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      type={type ? type : "button"}
      className={`relative flex gap-4 items-center justify-center px-5 sm:px-6 py-4 text-xs font-bold capitalize rounded-full transition disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50
        ${base && "text-[#7E88C3] bg-baseBg hover:bg-baseBgHover"}
        ${red && "text-white bg-[#ec5757] hover:bg-[#FF9797]"}
        ${purple && "text-white bg-[#7C5DFA] hover:bg-[#9277FF]"}
        ${
          grey &&
          "text-[#7E88C3] dark:text-[#DFE3FA] bg-defaultBg hover:bg-defaultHoverBg"
        }
        ${darkGrey && "text-secondary bg-grey hover:bg-greyHover"}
        ${customGrey && "text-secondary bg-greyCustom hover:bg-greyCustomHover"}
        ${stretch && "w-full"}
        ${Icon && "sm:pl-12"}
      `}
    >
      {Icon && <Icon size={32} className="absolute left-0 ml-2" />}
      {label}
    </button>
  );
};

export default Button;
