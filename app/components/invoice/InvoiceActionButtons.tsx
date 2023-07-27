"use client";

import Button from "../shared/Button";

import { useAppDispatch, useInvoice } from "@/redux/hooks";
import { deleteInvoice, updateStatus } from "@/redux/features/invoice-slice";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";

interface InvoiceActionButtonsProps {
  invoiceId: string;
  status: string;
}

const InvoiceActionButtons: React.FC<InvoiceActionButtonsProps> = ({
  invoiceId,
  status,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading] = useInvoice();

  const handleDelete = () => {
    dispatch(deleteInvoice(invoiceId))
      .then(unwrapResult)
      .then(() => {
        router.push("/");
      });
  };

  const handleStatusUpdate = () => {
    dispatch(updateStatus(invoiceId))
      .then(unwrapResult)
      .then(() => {
        router.refresh();
      });
  };

  return (
    <>
      <Button grey label="Edit" />
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
