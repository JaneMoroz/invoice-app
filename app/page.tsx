import getCurrentUser from "./actions/getCurrentUser";
import getInvoices from "./actions/getInvoices";

import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";

const data = [
  {
    id: "RT3080",
    createdAt: "2021-08-18",
    paymentDue: "2021-08-19",
    description: "Re-branding",
    paymentTerms: 1,
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Brand Guidelines",
        quantity: 1,
        price: 1800.9,
        total: 1800.9,
      },
    ],
    total: 1800.9,
  },
];

export default async function Home() {
  const currentUser = await getCurrentUser();
  // const invoices = await getInvoices();
  const invoices = [];

  if (invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <h1 className="">Invoices</h1>
    </>
  );
}
