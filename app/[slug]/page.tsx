"use client";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { formatMoney } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductForm } from "@/components/sign-up-form";

const DetailPage = ({
  params: { slug: productSlug },
}: {
  params: { slug: string };
}) => {
  const products: any = {
    "ao-co-dong": {
      name: "Áo Cổ Động",
      description: "Áo được làm từ vải",
      price: 420000,
      colors: ["Đen", "Be"],
      sizes: ["M", "L", "XL", "2XL"],
      images: ["shirt-black.jpg", "shirt-cream.jpg"],
    },
    "non-co-dong": {
      name: "Nón Cổ Động",
      description: "Nón được dùng để đội",
      price: 200000,
      colors: [],
      sizes: [],
      images: ["hat.jpg"],
    },
  };

  const currentProduct = products[productSlug];

  if (currentProduct) {
    return (
      <main className="grid grid-cols-2 gap-24 p-24 min-h-screen container mx-auto">
        <Carousel className="w-full flex flex-col justify-center">
          <CarouselContent>
            {currentProduct?.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                      <Image
                        src={`/${image}`}
                        alt="Co Dong"
                        width={500}
                        height={500}
                        className="w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <ProductForm product={products[productSlug]} />
      </main>
    );
  }
  return (
    <main className="flex justify-center items-center p-24 min-h-screen">
      Không tồn tại sản phẩm này
    </main>
  );
};

export default DetailPage;
