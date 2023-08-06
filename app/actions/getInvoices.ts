import prisma from "@/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import { Status } from "@prisma/client";

export interface IInvoicesParams {
  draft?: string;
  pending?: string;
  paid?: string;
}

export default async function getInvoices(params: IInvoicesParams) {
  try {
    const { draft, pending, paid } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    let query: any = {};
    query.userId = currentUser.id;

    const statusArray = [];

    if (!draft) {
      statusArray.push({ status: Status.DRAFT });
    }

    if (!pending) {
      statusArray.push({ status: Status.PENDING });
    }

    if (!paid) {
      statusArray.push({ status: Status.PAID });
    }

    if (paid || pending || draft) {
      query.OR = statusArray;
    }

    const invoices = await prisma.invoice.findMany({
      where: query,
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
