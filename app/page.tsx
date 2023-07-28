import getCurrentUser from "./actions/getCurrentUser";
import getInvoices from "./actions/getInvoices";

import InvoiceCard from "./components/invoice/InvoiceCard";
import EmptyState from "./components/shared/EmptyState";
import HeaderControls from "./components/shared/HeaderControls";

export default async function Home() {
  const invoices = await getInvoices();
  const currentUser = await getCurrentUser();

  if (invoices.length === 0) {
    return (
      <>
        <HeaderControls
          currentUser={currentUser}
          numOfInvoices={invoices.length}
        />
        <EmptyState />
      </>
    );
  }

  return (
    <>
      <HeaderControls
        currentUser={currentUser}
        numOfInvoices={invoices.length}
      />
      <div className="flex flex-col gap-3 overflow-y-auto">
        {invoices.map((invoice, index) => (
          <InvoiceCard key={index} invoice={invoice} />
        ))}
      </div>
    </>
  );
}
