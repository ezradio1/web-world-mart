import { PRODUCTS_ROUTE } from "@/constants/routes";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "WebWorldMart",
  icons: "favicon.ico",
};

export default function Home() {
  redirect(PRODUCTS_ROUTE);
}
