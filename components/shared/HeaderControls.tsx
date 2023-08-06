"use client";

import { useCallback } from "react";
import { Plus } from "@/assets/icons";
import Filter from "./Filter";

import { SafeUser } from "@/types";

import { useAppDispatch } from "@/libs/redux/hooks";
import { onOpen as onInvoiceOpen } from "@/libs/redux/features/invoice-slice";
import { onOpen as onLoginModalOpen } from "@/libs/redux/features/modals/login-modal-slice";

interface HeaderControlsProps {
  currentUser?: SafeUser | null;
  numOfInvoices: number;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentUser,
  numOfInvoices,
}) => {
  const dispatch = useAppDispatch();

  const createNewInvoice = useCallback(() => {
    if (!currentUser) {
      return dispatch(onLoginModalOpen());
    }

    dispatch(onInvoiceOpen());
  }, [currentUser, dispatch]);

  return (
    <div className="z-10 flex justify-between">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-[20px] sm:text-[32px] font-bold text-primary">
          Invoices
        </h1>
        <p className="text-xs font-medium text-secondary">
          {numOfInvoices === 0
            ? "No invoices"
            : `There are ${numOfInvoices} total invoices`}
        </p>
      </div>
      <div className="flex items-center gap-6 sm:gap-10">
        <Filter />
        <button
          onClick={createNewInvoice}
          className="flex gap-2 sm:gap-4 items-center p-1.5 pr-3 sm:p-2 sm:pr-4 text-xs font-bold capitalize rounded-full transition text-white bg-[#7C5DFA] hover:bg-[#9277FF]"
        >
          <span className="p-2.5 bg-white rounded-full">
            <Plus />
          </span>
          <div>
            New <span className="hidden sm:inline">Invoice</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderControls;
