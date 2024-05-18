"use client";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { formatMoney } from "@/lib/utils";

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-24 p-24 min-h-screen">
      <BackgroundGradient
        containerClassName="max-w-sm mx-auto my-auto cursor-pointer select-none"
        className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 mx-auto"
      >
        {/* <Image
          src={`/jordans.webp`}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain"
        /> */}
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto select-none pointer-events-none"
          src="/codong-black.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 select-none">
          Áo Cổ Động 2024
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 select-none">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <button className="rounded-full pl-1 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            {formatMoney(420000)} đ
          </span>
        </button>
      </BackgroundGradient>

      <BackgroundGradient
        containerClassName="max-w-sm mx-auto my-auto cursor-pointer"
        className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 mx-auto"
      >
        {/* <Image
          src={`/jordans.webp`}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain"
        /> */}
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto"
          src="/codong-black.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Nón Cổ Động 2024
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <button className="rounded-full pl-1 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            {formatMoney(200000)} đ
          </span>
        </button>
      </BackgroundGradient>
    </main>
  );
}
