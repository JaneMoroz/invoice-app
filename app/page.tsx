import getCurrentUser from "./actions/getCurrentUser";
import getInvoices from "./actions/getInvoices";

import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";

export default async function Home() {
  const currentUser = await getCurrentUser();
  // const invoices = await getInvoices();
  const invoices = [];

  if (invoices.length === 0) {
    return (
      <Container>
        <EmptyState />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="">Invoices</h1>
    </Container>
  );
}
