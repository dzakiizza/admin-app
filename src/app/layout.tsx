import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import { PAGE_LIST } from "@/lib/variables";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin App",
  description:
    "Admin app is a web app that can manage products that has been added and view items that are in the shopping carts "
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Wrapper menu={PAGE_LIST}>{children}</Wrapper>
        </Providers>
      </body>
    </html>
  );
}
