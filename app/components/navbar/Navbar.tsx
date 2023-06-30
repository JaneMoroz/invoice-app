"use client";

import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 h-full bg-nav rounded-tr-[20px] rounded-br-[20px] flex flex-col justify-between">
      <Logo />
      <div className="flex flex-col items-center">
        <ThemeToggler />
        <hr className="border-[#494E6E] w-full" />
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
