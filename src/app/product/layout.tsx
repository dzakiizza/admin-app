import React from "react";
import { ProductsProvider } from "./provider";

export default async function ProductLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
