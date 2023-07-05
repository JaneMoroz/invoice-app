import { ThemeProvider } from "@/providers/theme-provider";

import { Providers } from "@/redux/provider";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";

import "./globals.css";
import { League_Spartan } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";

const spartan = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "Invoice App",
  description: "Invoice App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-background" lang="en" suppressHydrationWarning>
      <body className={spartan.className}>
        <Providers>
          <ToasterProvider />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <Modal isOpen actionLabel="Submit" /> */}
            <RegisterModal />
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
