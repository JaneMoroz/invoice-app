"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative flex flex-col w-full gap-y-2.5">
      <label
        className={`
            text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]
            ${errors[id] && "text-[#EC5757] dark:text-[#EC5757]"}
        `}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`text-xs w-full py-4 px-5 font-bold bg-white dark:bg-[#1E2139] text-[#0C0E16] dark:text-white border border-[#DFE3FA] dark:border-[#252945] rounded outline-none transition disabled:cursor-not-allowed
            ${
              errors[id] &&
              "border-[#EC5757] focus:border-[#EC5757] dark:border-[#EC5757] dark:focus:border-[#EC5757]"
            }
          `}
      />
    </div>
  );
};

export default Input;
