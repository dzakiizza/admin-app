import React from "react";
import { CartsProvider } from "./provider";

export default function CarttLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <CartsProvider>{children}</CartsProvider>;
}
