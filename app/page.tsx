export const dynamic = "force-dynamic";

import getCurrentUser from "./actions/getCurrentUser";
import getInvoices, { IInvoicesParams } from "./actions/getInvoices";

import InvoiceCard from "../components/invoice/InvoiceCard";
import EmptyState from "../components/shared/EmptyState";
import HeaderControls from "../components/shared/HeaderControls";

interface HomeProps {
  searchParams: IInvoicesParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const invoices = await getInvoices(searchParams);
  const currentUser = await getCurrentUser();

  if (invoices.length === 0) {
    return (
      <>
        <HeaderControls
          currentUser={currentUser}
          numOfInvoices={invoices.length}
        />
        <EmptyState
          title="There is nothing here"
          subtitle="Create a new invoice by clicking the New Invoice button and get started"
        />
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
};

export default Home;
