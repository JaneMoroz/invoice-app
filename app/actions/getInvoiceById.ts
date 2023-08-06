import prisma from "@/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

interface IParams {
  invoiceId?: string;
}

export default async function getInvoiceById(params: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const { invoiceId } = params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return null;
    }

    if (invoice.userId !== currentUser.id) {
      return null;
    }

    return {
      ...invoice,
      invoiceDate: invoice.invoiceDate.toString(),
      createdAt: invoice.createdAt.toString(),
      updatedAt: invoice.updatedAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
