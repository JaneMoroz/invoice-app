import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
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

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  const body = await request.json();

  const {
    cityFrom,
    cityTo,
    clientEmail,
    clientName,
    countryFrom,
    countryTo,
    invoiceDate,
    items,
    paymentTerm,
    postCodeFrom,
    postCodeTo,
    description,
    streetFrom,
    streetTo,
    status,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const total = items
    .reduce(
      (
        acc: number,
        cur: {
          name: string;
          price: string;
          quantity: string;
          total: string;
        }
      ) => acc + +cur.total,
      0
    )
    .toFixed(2)
    .toString();

  const invoice = await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      streetFrom,
      cityFrom,
      postCodeFrom,
      countryFrom: countryFrom.value,
      clientName,
      clientEmail,
      streetTo,
      cityTo,
      postCodeTo,
      countryTo: countryTo.value,
      invoiceDate,
      paymentTerm: paymentTerm.value,
      description: description,
      total: total,
      status: status,
      items: {
        deleteMany: {},
        create: [...items],
      },
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
