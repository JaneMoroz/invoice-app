"use client";

import React from "react";
import Select from "react-select";

export type SelectValue = {
  value: string;
  label?: string;
};

interface CountrySelectProps {
  label: String;
  value?: SelectValue;
  onChange: (value: String) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  value,
  onChange,
}) => {
  const options = [
    { value: "next1", label: "Next 1 Day" },
    { value: "next7", label: "Next 7 Day" },
    { value: "next14", label: "Next 14 Day" },
    { value: "next30", label: "Next 30 Day" },
  ];
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
        options={options}
        value={value}
        onChange={(value) => onChange(value as String)}
        formatOptionLabel={(option: any) => <span>{option.label}</span>}
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
