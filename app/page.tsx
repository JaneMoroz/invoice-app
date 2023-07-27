import getInvoices from "./actions/getInvoices";

import InvoiceCard from "./components/invoice/InvoiceCard";
import EmptyState from "./components/shared/EmptyState";

export default async function Home() {
  const invoices = await getInvoices();

  if (invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {invoices.map((invoice, index) => (
        <InvoiceCard key={index} invoice={invoice} />
      ))}
    </div>
  );
}
