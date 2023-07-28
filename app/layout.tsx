import { ThemeProvider } from "@/providers/theme-provider";

import { Providers } from "@/redux/provider";

import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import InvoiceModal from "./components/modals/InvoiceModal/InvoiceModal";
import Container from "./components/shared/Container";
import HeaderControls from "./components/shared/HeaderControls";
import DeleteModal from "./components/modals/DeleteModal";

import getCurrentUser from "./actions/getCurrentUser";

import "./globals.css";
import { League_Spartan } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";

const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--spartan-font",
});

export const metadata = {
  title: "Invoice App",
  description: "Invoice App",
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
                <div className="flex flex-col w-full h-full gap-14">
                  <HeaderControls currentUser={currentUser} />
                  {children}
                </div>
              </Container>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
