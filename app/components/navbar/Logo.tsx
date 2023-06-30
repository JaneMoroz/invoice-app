"use client";

import Image from "next/image";
import logo from "../../../public/images/logo.svg";

const Logo = () => {
  return (
    <div
      className="relative p-8 bg-[rgb(124,93,250)] rounded-tr-[20px] rounded-br-[20px] 
                 before:absolute before:top-1/2 before:left-0 before:bg-[rgb(146,119,255)] before:h-1/2 before:w-full before:rounded-tl-[20px]"
    >
      <div className="h-9">
        <Image
          className="relative h-full w-full object-cover z-50"
          priority
          src={logo}
          alt="Invoice app logo"
        />
      </div>
    </div>
  );
};

export default Logo;
