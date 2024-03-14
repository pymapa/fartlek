import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionUpdater from "./SessionUpdater";
import { NextAuthProvider } from "./NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fartlek activity tool",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <NextAuthProvider>
        <body className={inter.className}>
          <SessionUpdater />
          {children}
          </body>
      </NextAuthProvider>
    </html>
  );
}
