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

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  console.log("Cronjob is finished");
  return Response.json({});
}
