"use client";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { formatMoney } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-24 p-24 pt-48 md:pt-24 min-h-screen">
      <a
        className="mx-auto my-auto cursor-pointer"
        onClick={() => {
          router.push("/ao-co-dong");
        }}
      >
        <BackgroundGradient
          containerClassName="max-w-sm mx-auto my-auto select-none"
          className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 mx-auto"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto select-none pointer-events-none rounded-lg"
            src="/shirt-black.jpg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 select-none">
            Áo Cổ Động 2024
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 select-none">
            Áo được làm từ vải, dùng để mặc.
          </p>
          <button className="rounded-full pl-1 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span className="bg-zinc-700 rounded-full text-[1rem] px-2 py-0 text-white">
              {formatMoney(420000)} đ
            </span>
          </button>
        </BackgroundGradient>
      </a>
      <a
        className="mx-auto my-auto cursor-pointer"
        onClick={() => {
          router.push("/non-co-dong");
        }}
      >
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
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto select-none pointer-events-none rounded-lg"
            src="/hat.jpg"
            alt="Co Dong"
            width={180}
            height={37}
            priority
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Nón Cổ Động 2024
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Nón màu đen, được dùng để đội.
          </p>
          <button className="rounded-full pl-1 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span className="bg-zinc-700 rounded-full text-[1rem] px-2 py-0 text-white">
              {formatMoney(200000)} đ
            </span>
          </button>
        </BackgroundGradient>
      </a>
    </main>
  );
}
