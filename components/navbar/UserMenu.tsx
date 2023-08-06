"use client";

import { SafeUser } from "@/types";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";

import { useAppDispatch } from "@/libs/redux/hooks";
import { onOpen as onRegisterModalOpen } from "@/libs/redux/features/modals/register-modal-slice";
import { onOpen as onLoginModalOpen } from "@/libs/redux/features/modals/login-modal-slice";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [setIsOpen]);

  return (
    <div className="relative flex justify-center w-full">
      <button
        aria-label="user menu"
        className="p-4 mx-2 sm:mx-4 md:my-2"
        onClick={toggleOpen}
      >
        <Avatar src={currentUser?.image} />
      </button>
      {isOpen && (
        <div className="absolute rounded-[8px] overflow-hidden top-full right-0 mr-2 mt-2 md:left-full md:top-1/2 w-[200px] md:ml-2 md:mr-0 md:mt-0 md:-translate-y-1/2 shadow-xl">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => signOut()} label="Sign out" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(onLoginModalOpen());
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(onRegisterModalOpen());
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
