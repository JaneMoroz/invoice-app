import { Invoice, User } from "@prisma/client";

export type SafeInvoice = Omit<
  Invoice,
  "invoiceDate" | "createdAt" | "updatedAt"
> & {
  invoiceDate: string;
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
