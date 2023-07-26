import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  console.log(body);

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
    projectDesc,
    streetFrom,
    streetTo,
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
        cur: { name: string; price: string; quantity: string; total: string }
      ) => acc + +cur.total,
      0
    )
    .toString();

  const invoice = await prisma.invoice.create({
    data: {
      userId: currentUser.id,
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
      description: projectDesc,
      total: total,
      items: {
        create: [...items],
      },
    },
  });

  return NextResponse.json(invoice);
}
