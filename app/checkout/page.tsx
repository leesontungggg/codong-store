"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CopyIcon } from "@radix-ui/react-icons";

import { formatMoney, makeid } from "@/lib/utils";
import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import createNewOrder from "@/lib/actions/creat-new-order";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";



const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
});

export default function CheckoutPage() {
  const [dialog, showDialog] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { cart, clearCart } = useCartStore((state) => state);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const tempOrderId = makeid(5);
    const total = cart.reduce(
      (n, { price, amount }: any) => n + price * amount,
      0
    );
    const orderData = {
      ...values,
      cartJSON: JSON.stringify(cart),
      orderId: tempOrderId,
      total,
    };

    createNewOrder(orderData).then(() => {
      setOrderId(tempOrderId);
      showDialog(true);
      toast({
        title: "Thành công",
        description: `Tạo đơn hàng thành công.`,
      });
    });
  };

  if (cart.length === 0) {
    return (
      <div className="w-screen min-h-screen h-fit flex items-center justify-center text-white text-9xl">
        Giỏ hàng đang trống
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen h-fit flex items-center justify-center p-4">
      {!dialog && (
        <div className="grid grid-cols-1 md:grid-cols-2 container px-2 py-4 mt-auto md:mt-0 bg-white mx-auto rounded-2xl gap-4 md:divide-x border">
          <div className="p-1 md:p-4 flex flex-col justify-center items-center text-lg">
            Vui lòng điền thông tin thanh toán
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Họ và Tên
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  {...form.register("name")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  type="email"
                  {...form.register("email")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Số Điện Thoại
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  {...form.register("phone")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Địa chỉ
                </Label>
                <Input
                  id="address"
                  className="col-span-3"
                  {...form.register("address")}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-slate-800 text-white w-fit mx-auto"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              Tiến hành đặt hàng
            </Button>
            {Object.keys(form.formState?.errors).length > 0 && (
              <p className="mx-auto text-center mt-4 text-red-500">
                Hãy hoàn thành các thông tin phía trên
              </p>
            )}
          </div>
          <div className="p-2 md:p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Tên</TableHead>
                  <TableHead className="text-center">Số lượng</TableHead>
                  <TableHead className="text-right">Đơn giá</TableHead>
                  <TableHead className="text-right">Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((cartItem: any) => (
                  <TableRow key={cartItem.id}>
                    <TableCell className="font-medium flex flex-col justify-center items-center text-center gap-4">
                      {cartItem.name}
                      <Image
                        src={`/${cartItem.image}`}
                        width={140}
                        height={70}
                        alt={"Co Dong"}
                        className="flex-shrink-0 rounded-md shadow-2xl"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {cartItem.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatMoney(cartItem.price)} đ
                    </TableCell>
                    <TableCell className="text-right">{`${formatMoney(
                      cartItem.price * cartItem.amount
                    )}đ`}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} className="text-xl">
                    Tổng
                  </TableCell>
                  <TableCell colSpan={2} className="text-right text-xl">
                    {`${formatMoney(
                      cart.reduce(
                        (n, { price, amount }: any) => n + price * amount,
                        0
                      )
                    )} đ`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <Dialog open={dialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-md">
          <DialogHeader>
            <DialogTitle>Thông tin thanh toán</DialogTitle>
            <DialogDescription>
              Bạn vui lòng chuyển khoản theo nội dung dưới đây để hoàn tất thanh
              toán đơn hàng
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-4 mt-4 mb-4">
              <p>Số tiền</p>
              <h3 className="text-blue-950 rounded-lg px-4 py-2 border border-dashed border-blue-950 bg-blue-950/20 flex items-center">
                {cart.reduce(
                  (n, { price, amount }: any) => n + price * amount,
                  0
                )}
                <a
                  className="ml-4 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(
                        String(
                          cart.reduce(
                            (n, { price, amount }: any) => n + price * amount,
                            0
                          )
                        )
                      )
                      .then(() => toast({ title: "Sao chép thành công" }))
                  }
                >
                  <CopyIcon />
                </a>
              </h3>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 mb-4">
              <p>Nội dung</p>
              <h3 className="text-blue-950 rounded-lg px-4 py-2 border border-dashed border-blue-950 bg-blue-950/20 flex items-center">
                {`CD-${orderId}-${form.getValues("phone")}`}
                <a
                  className="ml-4 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(`CD-${orderId}-${form.getValues("phone")}`)
                      .then(() => toast({ title: "Sao chép thành công" }))
                  }
                >
                  <CopyIcon />
                </a>
              </h3>
            </div>
            <Image
              src={`/logo-vcb.webp`}
              width={150}
              height={30}
              alt="Co Dong"
            />

            <div className="flex flex-row justify-center items-center gap-4 mt-4">
              <p>Tên tài khoản</p>
              <h3 className="text-blue-950 rounded-lg px-4 py-2 border border-dashed border-blue-950 bg-blue-950/20 flex items-center">
                LE HUYEN LINH
                <a
                  className="ml-4 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(`LE HUYEN LINH`)
                      .then(() => toast({ title: "Sao chép thành công" }))
                  }
                >
                  <CopyIcon />
                </a>
              </h3>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 mt-4">
              <p>Số tài khoản</p>
              <h3 className="text-blue-950 rounded-lg px-4 py-2 border border-dashed border-blue-950 bg-blue-950/20 flex items-center">
                1028169568
                <a
                  className="ml-4 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(`1028169568`)
                      .then(() => toast({ title: "Sao chép thành công" }))
                  }
                >
                  <CopyIcon />
                </a>
              </h3>
            </div>
            <Image
              src={`https://img.vietqr.io/image/vietcombank-1028169568-compact2.png?amount=${cart.reduce(
                (n, { price, amount }: any) => n + price * amount,
                0
              )}&addInfo=${`CD-${orderId}-${form.getValues(
                "phone"
              )}`}&accountName=LE%20HUYEN%20LINH`}
              width={384}
              height={384}
              alt="Co Dong"
              className="mt-4"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                clearCart();
                router.push("/thankyou");
                router;
              }}
            >
              Hoàn thành
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
