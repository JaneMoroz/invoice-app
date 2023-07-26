import getInvoices from "./actions/getInvoices";

import InvoiceCard from "./components/invoice/InvoiceCard";
import EmptyState from "./components/shared/EmptyState";

export default async function Home() {
  // const invoices = await getInvoices();

  // console.log(invoices);

  const invoices = [
    {
      id: "64c117cd4ec1a298a19766cb",
      userId: "64a5877919aee4d83fb6a42c",
      streetFrom: "Baker st. 16B",
      cityFrom: "London",
      postCodeFrom: "123gbh",
      countryFrom: "GB",
      clientName: "Josh Wayne",
      clientEmail: "josh@mail.com",
      streetTo: "Center Square, 16-78",
      cityTo: "Berlin",
      postCodeTo: "12bv55",
      countryTo: "DE",
      invoiceDate: "Wed Jul 26 2023 15:51:54 GMT+0300 (Moscow Standard Time)",
      paymentTerm: "NET7",
      description: "Software e-commerce development",
      total: "504.6",
      status: "PENDING",
      createdAt: "Wed Jul 26 2023 15:55:41 GMT+0300 (Moscow Standard Time)",
      updatedAt: "Wed Jul 26 2023 15:55:41 GMT+0300 (Moscow Standard Time)",
    },
  ];

  if (invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {invoices.map((invoice, index) => (
        <InvoiceCard key={index} data={invoice} />
      ))}
    </div>
  );
}
