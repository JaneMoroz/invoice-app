"use client";

import Button from "../shared/Button";

import { useAppDispatch, useInvoice } from "@/libs/redux/hooks";
import { onEdit, updateStatus } from "@/libs/redux/features/invoice-slice";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import { SafeInvoice } from "@/types";
import {
  onOpen,
  setInvoiceId,
} from "@/libs/redux/features/modals/delete-modal-slice";
import { useCallback } from "react";

interface InvoiceActionButtonsProps {
  invoice: SafeInvoice;
  status: string;
}

const InvoiceActionButtons: React.FC<InvoiceActionButtonsProps> = ({
  invoice,
  status,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading] = useInvoice();

  const handleEdit = () => {
    dispatch(onEdit(invoice));
  };

  const handleDeleteModal = useCallback(() => {
    dispatch(setInvoiceId(invoice.id));
    dispatch(onOpen());
  }, [dispatch, invoice.id]);

  const handleStatusUpdate = useCallback(() => {
    dispatch(updateStatus(invoice.id))
      .then(unwrapResult)
      .then(() => {
        router.refresh();
      });
  }, [dispatch, invoice.id, router]);

  return (
    <>
      <Button onClick={handleEdit} disabled={isLoading} grey label="Edit" />
      <Button
        onClick={handleDeleteModal}
        disabled={isLoading}
        red
        label="Delete"
      />
      <Button
        onClick={handleStatusUpdate}
        disabled={isLoading || status === "paid"}
        purple
        label="Mark as Paid"
      />
    </>
  );
};

export default InvoiceActionButtons;
