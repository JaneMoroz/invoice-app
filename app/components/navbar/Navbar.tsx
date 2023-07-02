"use client";

import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full md:w-auto md:h-full bg-nav md:rounded-tr-[20px] md:rounded-br-[20px] flex md:flex-col justify-between">
      <Logo />
      <div className="flex items-center md:flex-col">
        <ThemeToggler />
        <div className="w-px md:w-full h-full md:h-px bg-[#494E6E]"></div>
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
