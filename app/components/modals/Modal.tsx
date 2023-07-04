"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
      <div className="w-full mx-auto my-6 sm:w-[480px] lg:h-auto md:h-auto">
        {/* CONTENT */}
        <div className="flex flex-col w-full h-full p-8 rounded-lg shadow-md outline-none sm:p-12 bg-modal lg:h-auto md:h-auto focus:outline-none">
          {/* HEADER */}
          <div className="text-xl font-bold sm:text-2xl text-primary">
            Confirm Deletion
          </div>
          {/* BODY */}
          <div className="pt-3 pb-4 text-xs font-medium leading-5 text-darkGrey">
            Are you sure you want to delete invoice #XM9141? This action cannot
            be undone.
          </div>
          {/* FOOTER */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-end w-full gap-2">
              <Button grey label="cancel" onClick={() => {}} />
              <Button red label="delete" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
