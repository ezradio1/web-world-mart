import clsx from "clsx";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebWorldMart",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className)}>
        {children}
      </body>
    </html>
  );
}
