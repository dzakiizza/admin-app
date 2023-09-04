import React from "react";
import { CartsProvider } from "../provider";

export default function DetailCarttLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    cart_id: string;
  };
}) {
  return <CartsProvider id={params.cart_id}>{children}</CartsProvider>;
}
