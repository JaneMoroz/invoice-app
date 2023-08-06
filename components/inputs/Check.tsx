"use client";

import { useCallback } from "react";
import { Check } from "@/assets/icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CheckProps {
  id: string;
  label: string;
  checked: boolean;
}

const Input: React.FC<CheckProps> = ({ id, label, checked }) => {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let updatedQuery: any = {
      ...currentQuery,
    };

    if (params?.get(label) === "false") {
      delete updatedQuery[label];
    } else {
      if (label === "draft") {
        updatedQuery = { ...currentQuery, draft: false };
      } else if (label === "pending") {
        updatedQuery = { ...currentQuery, pending: false };
      } else {
        updatedQuery = { ...currentQuery, paid: false };
      }
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <label
      className="relative text-xs font-bold capitalize cursor-pointer text-primary"
      htmlFor={id}
    >
      <input
        className="absolute w-0 h-0 opacity-0 cursor-pointer peer"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
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
