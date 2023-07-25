"use client";

import { Check } from "@/app/assets/icons/icons";

interface CheckProps {
  id: string;
  label: string;
}

const Input: React.FC<CheckProps> = ({ id, label }) => {
  return (
    <label
      className="relative text-xs font-bold capitalize cursor-pointer text-primary"
      htmlFor={id}
    >
      <input
        className="absolute w-0 h-0 opacity-0 cursor-pointer peer"
        id={id}
        type="checkbox"
      />
      <div className="block absolute top-0 left-0 h-4 w-4 bg-[#DFE3FA] dark:bg-[#1E2139] border border-transparent hover:border-[#7C5DFA] rounded transition peer-checked:border-[#7C5DFA] peer-checked:bg-[#7C5DFA]"></div>
      <div className="absolute hidden top-[3px] left-[2.5px] peer-checked:block">
        <Check />
      </div>
      <span className="pl-7">{label}</span>
    </label>
  );
};

export default Input;
