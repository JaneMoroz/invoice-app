"use client";

import React from "react";
import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  flag: string;
  label: string;
};

interface CountrySelectProps {
  label: String;
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  value,
  onChange,
}) => {
  const { getAll } = useCountries();
  return (
    <div className="relative flex flex-col w-full gap-y-2.5">
      <label
        className={`
            text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]
        `}
      >
        {label}
      </label>
      <Select
        placeholder="Select"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>{option.label}</div>
          </div>
        )}
        className="react-select-container"
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
    </div>
  );
};

export default CountrySelect;
