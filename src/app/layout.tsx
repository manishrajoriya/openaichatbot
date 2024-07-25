import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chat from "@/components/Chat";
import Providers from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book store",
  description: "Ai book store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <Chat/>
        {children}
        </body>
        </Providers>
    </html>
  );
}
