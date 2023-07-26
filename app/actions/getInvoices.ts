import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getInvoices() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        items: true,
      },
    });

    const safeInvoices = invoices.map((invoice) => ({
      ...invoice,
      invoiceDate: invoice.invoiceDate.toString(),
      createdAt: invoice.createdAt.toString(),
      updatedAt: invoice.updatedAt.toString(),
    }));

    return safeInvoices;
  } catch (error: any) {
    throw new Error(error);
  }
}
