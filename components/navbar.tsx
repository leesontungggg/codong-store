"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/providers/cart-store-provider";
import { formatMoney } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const { cart, removeCartItem } = useCartStore((state) => state);
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  console.log("cart", cart.length);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 flex flex-col justify-center items-center",
        className
      )}
    >
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert cursor-pointer"
        src="/codong-white.png"
        alt="Next.js Logo"
        width={150}
        height={150}
        priority
        onClick={() => router.push("/")}
      />

      {cart.length > 0 && (
        <Menu setActive={setActive}>
          {/* <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem> */}
          <MenuItem setActive={setActive} active={active} item="Giỏ Hàng">
            <div className="text-sm grid grid-cols-1 gap-10 p-4">
              {cart.map((cartItem: any, index) => (
                <ProductItem
                  key={index}
                  title={cartItem.name}
                  href="#"
                  src={`/${cartItem.image}`}
                  description={cartItem.description}
                  amount={cartItem.amount}
                  itemTotal={cartItem.amount * cartItem.price}
                  removeItem={() => removeCartItem(cartItem)}
                />
              ))}
              <div className="text-2xl flex justify-center">
                Tổng tiền:{" "}
                {formatMoney(
                  cart.reduce((a: any, b: any) => b.amount * b.price + a, 0)
                )}{" "}
                đ
              </div>
              <a
                href="/checkout"
                className="text-xl flex justify-center underline"
              >
                Đến trang thanh toán
              </a>
              {/* <ProductItem
                title="Algochurn"
                href="#"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="#"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="#"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="#"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              /> */}
            </div>
          </MenuItem>
          {/* <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem> */}
        </Menu>
      )}
    </div>
  );
}
