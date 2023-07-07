"use client";

import { SafeUser } from "@/app/types";

import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="absolute top-0 left-0 w-full md:w-auto md:h-full bg-nav md:rounded-tr-[20px] md:rounded-br-[20px] flex md:flex-col justify-between">
      <Logo />
      <div className="flex items-center md:flex-col">
        <ThemeToggler />
        <div className="w-px md:w-full h-full md:h-px bg-[#494E6E]"></div>
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
