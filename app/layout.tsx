import { ThemeProvider } from "@/libs/providers/ThemeProvider";

import { Providers } from "@/libs/redux/provider";

import Navbar from "../components/navbar/Navbar";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import InvoiceModal from "../components/modals/InvoiceModal/InvoiceModal";
import Container from "../components/shared/Container";
import DeleteModal from "../components/modals/DeleteModal";

import getCurrentUser from "./actions/getCurrentUser";

import "./globals.css";
import { League_Spartan } from "next/font/google";

import ToasterProvider from "../libs/providers/ToasterProvider";

const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--spartan-font",
});

export const metadata = {
  generator: "Next.js",
  applicationName: "Invoice App",
  title: "Invoice App",
  description: "Invoice App helps you to track your invoices.",
  authors: [{ name: "Jane Moroz", url: "https://jane-moroz-dev.netlify.app" }],
  keywords: ["nextjs", "frontend mentor", "invoice app"],
  metadataBase: new URL("https://invoice-app-fe-mentor.vercel.app"),
  openGraph: {
    title: "Invoice App",
    description: "Invoice App helps you to track your invoices.",
    url: "https://invoice-app-fe-mentor.vercel.app",
    type: "website",
    locale: "en_US",
    siteName: "Invoice app",
    images:
      "https://github.com/JaneMoroz/invoice-app/blob/main/images/home-dark.jpg?raw=true",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice app",
    description: "Invoice App helps you to track your invoices.",
    images: [
      "https://github.com/JaneMoroz/invoice-app/blob/main/images/home-dark.jpg?raw=true",
    ],
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <html className="bg-background" lang="en" suppressHydrationWarning>
        <body className={spartan.className}>
          <Providers>
            <ToasterProvider />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <RegisterModal />
              <LoginModal />
              <InvoiceModal />
              <DeleteModal />
              <Navbar currentUser={currentUser} />
              <Container>
                <main className="flex flex-col w-full h-full gap-14">
                  {children}
                </main>
              </Container>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
