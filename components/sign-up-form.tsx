"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { v4 as uuidv4 } from "uuid";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatMoney } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { useCartStore } from "@/providers/cart-store-provider";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  product: any;
}

const formSchema = z.object({
  color: z.string().nonempty({ message: "Hãy chọn màu áo" }),
  size: z.string().nonempty({ message: "Hãy chọn size áo" }),
  amount: z.number(),
});

export function ProductForm(props: ProductFormProps) {
  const [dialog, showDialog] = useState(false);
  const { cart, addCartItem } = useCartStore((state) => state);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "",
      size: "",
      amount: 1,
    },
  });

  const watchAmount = form.watch("amount");

  useEffect(() => {
    if (props.product?.name === "Nón Cổ Động") {
      form.setValue("size", "default");
      form.setValue("color", "black");
    }
  }, [props.product, form]);

  const onClick = (adjustment: number) => {
    form.setValue("amount", watchAmount + adjustment);
  };

  const handleSubmit = (value: any) => {
    let productImage;

    switch (props.product.name) {
      case "Áo Cổ Động":
        productImage =
          value.color === "Đen" ? "shirt-black.jpg" : "shirt-cream.jpg";
        break;

      case "Nón Cổ Động":
        productImage = "hat.jpg";
        break;

      case "Combo Áo và Nón Cổ Động":
        productImage =
          value.color === "Đen"
            ? "shirt-black-combo.jpg"
            : "shirt-cream-combo.jpg";
        break;
    }

    const cartItem = {
      id: uuidv4(),
      ...value,
      name: props.product.name,
      description: props.product.description,
      price: props.product.price,
      itemTotal: props.product.price * value.amount,
      image: productImage,
    };
    addCartItem(cartItem);
    toast({
      title: "Thành công",
      description: `Đã thêm thành công ${cartItem.amount} sản phẩm ${cartItem.name}`,
      action: (
        <ToastAction
          onClick={() => router.push("/checkout")}
          altText="Xem giỏ hàng"
        >
          Thanh toán
        </ToastAction>
      ),
    });
  };
  return (
    <div className="w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black my-auto h-fit">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {props.product?.name}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {props.product?.description}
      </p>
      {props.product?.note && (
        <p className="text-red-700 text-sm max-w-sm mt-2 dark:text-neutral-300">
          ***Note: {props.product?.note}
        </p>
      )}

      <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
        {props.product?.colors?.length > 0 && (
          <div className="mb-4">
            <Select
              {...form.register("color")}
              onValueChange={(val) => form.setValue("color", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn màu sắc" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {props.product.colors.map((color: any, index: number) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        {props.product?.sizes?.length > 0 && (
          <div className="mb-4">
            <Select
              {...form.register("size")}
              onValueChange={(val) => form.setValue("size", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn size áo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {props.product.sizes.map((size: any) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                onClick(-1);
              }}
              disabled={watchAmount <= 1}
            >
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Số lượng
              </div>
              <div className="text-7xl font-bold tracking-tighter">
                {watchAmount}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                onClick(1);
              }}
              disabled={watchAmount >= 5}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Tổng tiền
              </div>
              <div className="text-5xl font-bold tracking-tighter mt-4">
                {formatMoney(watchAmount * props.product?.price)}đ
              </div>
            </div>
          </div>
        </div>
        {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer> */}
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Your twitter password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer> */}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Thêm vào Giỏ Hàng
          <BottomGradient />
        </button>
        {Object.keys(form.formState?.errors).length > 0 && (
          <p className="mx-auto text-center mt-4">
            Hãy chọn các thuộc tính phía trên
          </p>
        )}
      </form>

      <Dialog open={dialog} onOpenChange={(state) => showDialog(state)}>
        <DialogContent className="sm:max-w-[425px] md:max-w-md">
          <DialogHeader>
            <DialogTitle>Nhập thông tin Pre-order</DialogTitle>
            <DialogDescription>
              Cổ Động sẽ liên hệ để giao hàng dựa trên thông tin bên dưới
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên
              </Label>
              <Input id="name" placeholder="Họ Và Tên" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                SĐT
              </Label>
              <Input
                id="phone"
                placeholder="0xxxxxxxxx"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input id="address" placeholder="@@@" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Tiến hành thanh toán</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
