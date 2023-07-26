import getInvoiceById from "@/app/actions/getInvoiceById";

import EmptyState from "@/app/components/shared/EmptyState";
import InvoiceClient from "./InvoiceClient";

interface IParams {
  invoiceId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const invoice = await getInvoiceById(params);

  if (!invoice) {
    return <EmptyState />;
  }

  return <InvoiceClient invoice={invoice} />;
};

export default ListingPage;
