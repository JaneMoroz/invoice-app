"use client";

import { useCallback, useState } from "react";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative w-full flex justify-center pt-4">
      <button aria-label="user menu" className="p-4 mb-3" onClick={toggleOpen}>
        <Avatar />
      </button>
      {isOpen && (
        <div className="absolute rounded-[20px] bg-nav overflow-hidden left-full top-0 w-[200px] ml-3">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
