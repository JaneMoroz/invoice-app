"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Select from "react-select";

export type SelectValue = {
  value: string;
  label?: string;
};

interface SelectProps {
  id: string;
  label: string;
  value?: SelectValue;
  register: UseFormRegister<FieldValues>;
  onChange: (value: string) => void;
  errors: FieldErrors;
}

const CountrySelect: React.FC<SelectProps> = ({
  id,
  label,
  register,
  value,
  onChange,
  errors,
}) => {
  const options = [
    { value: "NET1", label: "Net 1 Day" },
    { value: "NET7", label: "Net 7 Days" },
    { value: "NET14", label: "Net 14 Days" },
    { value: "NET30", label: "Net 30 Days" },
  ];
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
      <Select
        instanceId={id}
        {...register(id, {
          required: {
            value: true,
            message: "can't be empty",
          },
        })}
        placeholder="Select"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as string)}
        formatOptionLabel={(option: any) => <span>{option.label}</span>}
        className={`${errors[id] && "react-select-error"}`}
        classNamePrefix="react-select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            borderRadius: "4px",
            borderWidth: "1px",
            primary: "#7C5DFA",
            primary25: "transparent",
          },
        })}
      />
      {errors[id] && (
        <span className="absolute top-0 right-0 text-[7px] font-medium text-[#EC5757] lowercase max-w-[40px]">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default CountrySelect;
