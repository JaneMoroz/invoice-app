"use client";

import Link from "next/link";
import { format, add } from "date-fns";

import { SafeInvoice } from "@/app/types";
import { TERMS } from "@/app/enums";
import { ArrowRight } from "@/app/assets/icons/icons";

interface InvoiceCardProps {
  data: SafeInvoice;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ data }) => {
  let invoiceDate = add(new Date(data.invoiceDate), {
    days: TERMS[data.paymentTerm],
  });

  return (
    <Link
      href={`/invoices/${data.id}`}
      className="w-full bg-white dark:bg-[#1E2139] grid-cols-2 sm:grid-cols-[50px_110px_repeat(3,1fr)_20px] grid md:grid-cols-[80px_120px_repeat(3,1fr)_20px] items-center py-6 sm:py-4 px-6 md:px-8 rounded-md font-medium text-sm text-primary gap-1 sm:gap-4"
    >
      <div className="mb-6 font-bold uppercase sm:mb-0">
        <span className="text-[#7E88C3]">#</span>
        {data.id.substring(0, 5)}
      </div>
      <span className="text-[#7E88C3] dark:text-[#DFE3FA]">
        Due {format(invoiceDate, "dd MMM yyyy")}
      </span>
      <span className="mb-6 sm:mb-0 col-start-2 row-start-1 justify-self-end sm:justify-self-start sm:col-auto sm:row-auto text-[#858BB2] dark:text-[#FFFFFF]">
        {data.clientName}
      </span>
      <span className="col-start-1 row-start-3 text-base font-bold sm:col-auto sm:row-auto md:pr-5 sm:justify-self-end">
        $ {data.total}
      </span>
      <div className="row-span-2 sm:row-span-1 flex justify-center items-center px-4 py-2.5 capitalize text-[#FF8F00] bg-[#FF8F00]/5 rounded-md">
        <span className="inline-block mr-3 h-2 w-2 rounded-full bg-[#FF8F00]"></span>
        {data.status === "PENDING"
          ? "pending"
          : data.status === "DRAFT"
          ? "draft"
          : "paid"}
      </div>
      <span className="justify-center hidden sm:flex">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default InvoiceCard;
