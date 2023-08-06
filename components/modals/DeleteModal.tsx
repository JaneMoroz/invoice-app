"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";

import Modal from "./Modal";

import { useAppDispatch, useDeleteModal } from "@/libs/redux/hooks";
import { onClose } from "@/libs/redux/features/modals/delete-modal-slice";
import { deleteInvoice } from "@/libs/redux/features/invoice-slice";
import getShortId from "@/helpers/getShortId";

const DeleteModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, isLoading, invoiceIdToDelete] = useDeleteModal();

  const handleDelete = useCallback(() => {
    dispatch(deleteInvoice(invoiceIdToDelete))
      .then(unwrapResult)
      .then(() => {
        dispatch(onClose());
        router.push("/");
        router.refresh();
      });
  }, [dispatch, invoiceIdToDelete, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete invoice #
        <span className="inline uppercase">
          {getShortId(invoiceIdToDelete)}
        </span>
        ? This action cannot be undone.
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Confirm Deletion"
      actionLabel="Delete"
      actionColor="red"
      secondaryActionLabel="Cancel"
      secondaryAction={() => dispatch(onClose())}
      onClose={() => dispatch(onClose())}
      onSubmit={handleDelete}
      body={bodyContent}
    />
  );
};

export default DeleteModal;
