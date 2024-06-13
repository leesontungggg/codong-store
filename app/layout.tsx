import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { CartStoreProvider } from "@/providers/cart-store-provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cổ Động Store",
  description: "Cổ Động Preorder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartStoreProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          style={{
            backgroundImage: `url("/background-2.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <Navbar />
          {children}
          <Toaster />
        </body>
      </CartStoreProvider>
    </html>
  );
}
