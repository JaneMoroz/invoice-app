import React, { useState } from "react";
import { ArrowDown } from "@/app/assets/icons/icons";
import Check from "../inputs/Check";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 p-4 text-xs font-bold sm:px-6 sm:py-4 text-primary"
      >
        <span>
          Filter <span className="hidden sm:inline">by status</span>
        </span>
        <span className={`${isOpen && "rotate-180"}`}>
          <ArrowDown />
        </span>
      </button>
      {isOpen && (
        <div className="w-[192px] absolute flex flex-col gap-4 p-6 mt-1 -translate-x-1/2 rounded left-1/2 bottom-100 mt- shadow-customShadow bg-popupBg">
          <Check label="draft" id="draft" />
          <Check label="pending" id="pending" />
          <Check label="paid" id="paid" />
        </div>
      )}
    </div>
  );
};

export default Filter;
