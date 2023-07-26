import prisma from "@/app/libs/prismadb";

interface IParams {
  invoiceId?: string;
}

export default async function getInvoiceById(params: IParams) {
  try {
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
