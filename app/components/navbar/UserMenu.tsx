"use client";

import { useCallback, useState } from "react";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";

import { useAppDispatch } from "@/redux/hooks";
import { onOpen as onRegisterModalOpen } from "@/redux/features/modals/register-modal-slice";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative flex justify-center w-full">
      <button
        aria-label="user menu"
        className="p-4 mx-2 sm:mx-4 md:my-2"
        onClick={toggleOpen}
      >
        <Avatar />
      </button>
      {isOpen && (
        <div className="absolute rounded-[8px] overflow-hidden top-full right-0 mr-2 mt-2 md:left-full md:top-1/2 w-[200px] md:ml-2 md:mr-0 md:mt-0 md:-translate-y-1/2 shadow-lg">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem
                onClick={() => dispatch(onRegisterModalOpen())}
                label="Sign up"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
