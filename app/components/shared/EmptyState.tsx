"use client";

import HeaderControls from "./HeaderControls";
import Image from "next/image";

import image from "../../../public/images/illustration-empty.svg";

const EmptyState = () => {
  return (
    <div className="flex flex-col w-full h-full gap-14">
      <HeaderControls />
      <div className="self-center flex-1 w-full overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-16 w-[220px] sm:w-[240px]">
            <Image src={image} priority alt="Illustration" />
          </div>
          <h2 className="text-[20px] font-bold text-primary mb-6 w-[220px] sm:w-[240px] text-center">
            There is nothing here
          </h2>
          <p className="text-sm font-medium text-center text-secondary w-[220px] sm:w-[240px]">
            Create a new invoice by clicking the{" "}
            <span className="font-bold">New Invoice</span> button and get
            started
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
