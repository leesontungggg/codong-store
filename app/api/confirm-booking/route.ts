import htmlLayoutBooking from "@/utils/htmlLayoutBooking";
import transporter from "../../../utils/email";

export async function POST(request: Request) {
  const data = await request.json();

  const mailOptions = {
    subject: `Xác nhận đặt hàng pre order Cổ Động Merch`,
    html: htmlLayoutBooking(
      data.name,
      data.email,
      data.phone,
      data.address,
      JSON.parse(data.cartJSON),
      data.orderId,
      data.total
    ),
    to: data.email,
    from: `Cổ Động <codongmerch@gmail.com>`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  console.log("Cronjob is finished");
  return Response.json({ message: "ok" });
}
