"use client";

import { SafeUser } from "@/types";

import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="z-30 absolute top-0 left-0 w-full md:w-auto md:h-full bg-nav md:rounded-tr-[20px] md:rounded-br-[20px] flex md:flex-col justify-between">
      <Logo />
      <nav className="flex items-center md:flex-col">
        <ThemeToggler />
        <div className="w-px md:w-full h-full md:h-px bg-[#494E6E]"></div>
        <UserMenu currentUser={currentUser} />
      </nav>
    </header>
  );
};

export default Navbar;
