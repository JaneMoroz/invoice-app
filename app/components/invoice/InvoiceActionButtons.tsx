"use client";

import Button from "../shared/Button";

import { useAppDispatch, useInvoice } from "@/redux/hooks";
import {
  deleteInvoice,
  onEdit,
  onOpen,
  updateStatus,
} from "@/redux/features/invoice-slice";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import { SafeInvoice } from "@/app/types";

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
    dispatch(onOpen());
  };

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id))
      .then(unwrapResult)
      .then(() => {
        router.push("/");
        router.refresh();
      });
  };

  const handleStatusUpdate = () => {
    dispatch(updateStatus(invoice.id))
      .then(unwrapResult)
      .then(() => {
        router.refresh();
      });
  };

  return (
    <>
      <Button onClick={handleEdit} disabled={isLoading} grey label="Edit" />
      <Button onClick={handleDelete} disabled={isLoading} red label="Delete" />
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
