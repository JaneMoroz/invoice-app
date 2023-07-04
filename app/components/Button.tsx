"use client";

interface ButtonProps {
  ariaLabel?: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: React.FC;
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
  icon,
  grey,
  purple,
  red,
  darkGrey,
  stretch,
}) => {
  return (
    <button
      className={`px-6 py-4 text-xs font-bold capitalize rounded-full transition bg-[#F9FAFE] hover:bg-[#DFE3FA] text-[#7E88C3]
        ${red && "text-white bg-[#ec5757] hover:bg-[#FF9797]"}
        ${purple && "text-white bg-[#7C5DFA] hover:bg-[#9277FF]"}
        ${
          grey &&
          "text-[#7E88C3] dark:text-[#DFE3FA] bg-defaultBg hover:bg-defaultHoverBg"
        }
        ${darkGrey && "text-secondary bg-grey hover:bg-greyHover"}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
