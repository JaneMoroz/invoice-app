"use client";

import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative flex items-center justify-center p-5 sm:p-6 md:p-8 bg-[rgb(124,93,250)] rounded-tr-[20px] rounded-br-[20px] 
                 before:absolute before:top-1/2 before:left-0 before:bg-[rgb(146,119,255)] before:h-1/2 before:w-full before:rounded-tl-[20px] overflow-hidden"
    >
      <div className="h-6.5 md:h-7">
        <Image
          className="relative z-40 object-cover w-full h-full"
          priority
          src={logo}
          alt="Invoice app logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
