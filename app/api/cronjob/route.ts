import { google } from "googleapis";
import { convertToDate } from "../../../utils/general";
import transporter from "../../../utils/email";
import { REGISTER_INFO } from "../../../utils/constant";
import htmlLayoutPayment from "../../../utils/htmlLayoutPayment";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  auth,
  version: "v4",
});

export async function POST() {
  const orders = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
    range: `ORDER`,
  });

  if (orders.data.values) {
    await orders.data.values.map(async (order, index) => {
      if (order[7] && order[7] === "x" && !order[8]) {
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          requestBody: {
            valueInputOption: "USER_ENTERED",
            data: [
              {
                range: `ORDER!I${index + 1}`,
                majorDimension: "ROWS",
                values: [["x"]],
              },
            ],
          },
        });

        const mailOptions = {
          subject: `Xác nhận thanh toán cho pre order Cổ Động Merch`,
          html: htmlLayoutPayment(
            order[REGISTER_INFO.GUEST_NAME],
            order[REGISTER_INFO.GUEST_EMAIL],
            order[REGISTER_INFO.GUEST_PHONE],
            order[REGISTER_INFO.GUEST_ADDRESS],
            JSON.parse(order[REGISTER_INFO.ITEMS_LIST]),
            order[REGISTER_INFO.ORDER_NUMBER],
            order[REGISTER_INFO.GUEST_TOTAL_MONEY]
          ),
          to: order[REGISTER_INFO.GUEST_EMAIL],
          from: `Cổ Động <codongmerch@gmail.com>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
  }

  console.log("Cronjob is finished");
  return Response.json({});
}
