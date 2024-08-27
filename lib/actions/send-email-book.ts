"use server";
import transporter from "@/utils/email";
import htmlLayoutBooking from "@/utils/htmlLayoutBooking";

export default async function sendEmailBooking(data: any) {
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
}
