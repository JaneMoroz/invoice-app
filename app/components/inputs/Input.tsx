"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  pattern?: { value: RegExp; message: string };
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: any;
  itemIndex?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  pattern,
  type = "text",
  disabled,
  required = false,
  register,
  errors,
  itemIndex,
}) => {
  return (
    <div className="relative flex flex-col w-full gap-y-2.5">
      <label
        htmlFor={id}
        className={`
            text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]
            ${errors[id] && "text-[#EC5757] dark:text-[#EC5757]"}
            ${
              itemIndex !== undefined &&
              errors["items"] &&
              errors["items"][itemIndex] &&
              errors["items"][itemIndex][`${id.split(".")[1]}`] &&
              "text-[#EC5757] dark:text-[#EC5757]"
            }
            ${itemIndex !== undefined && "sm:hidden"}
        `}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: {
            value: required,
            message: "can't be empty",
          },
          pattern,
        })}
        placeholder=" "
        type={type}
        step="0.01"
        className={`text-xs w-full py-4 px-5 font-bold bg-white dark:bg-[#1E2139] text-[#0C0E16] dark:text-white border border-[#DFE3FA] dark:border-[#252945] rounded outline-none transition disabled:cursor-not-allowed
            ${
              errors[id] &&
              "border-[#EC5757] focus:border-[#EC5757] dark:border-[#EC5757] dark:focus:border-[#EC5757]"
            }
            ${
              itemIndex !== undefined &&
              errors["items"] &&
              errors["items"][itemIndex] &&
              errors["items"][itemIndex][`${id.split(".")[1]}`] &&
              "border-[#EC5757] focus:border-[#EC5757] dark:border-[#EC5757] dark:focus:border-[#EC5757]"
            }
            ${(id === "postCodeFrom" || id === "postCodeTo") && "uppercase"}
            ${
              type === "number" &&
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            }
          `}
      />
      {errors[id] && itemIndex === undefined && (
        <span className="absolute top-0 right-0 text-[7px] font-medium text-[#EC5757] lowercase max-w-[40px]">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
