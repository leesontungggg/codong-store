import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { CartStoreProvider } from "@/providers/cart-store-provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "300",
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
      <head>
        <meta
          property="og:image"
          content="https://codong-store.vercel.app/codong_thumbnail_og.jpg"
        />
        <meta property="og:title" content="Cổ Động Pre-order" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codong-store.vercel.app/" />
        <meta
          property="og:description"
          content="Cổ Động T-shirt Preorder Site"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
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
