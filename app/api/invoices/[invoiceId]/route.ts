import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Status } from "@prisma/client";

interface IParams {
  invoiceId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  const invoice = await prisma.invoice.updateMany({
    where: {
      id: invoiceId,
      userId: currentUser.id,
    },
    data: {
      status: Status.PAID,
    },
  });

  return NextResponse.json(invoice);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  if (!invoiceId || typeof invoiceId !== "string") {
    throw new Error("Invalid ID");
  }

  const invoice = await prisma.invoice.deleteMany({
    where: {
      id: invoiceId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(invoice);
}
