"use server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export default async function createNewOrder(data: any) {
  try {
    const auth = await new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = await google.sheets({
      auth,
      version: "v4",
    });

    const valueArray: any[] = [];

    const bodyObjectArray = Object.keys(data);

    for (let i = 0; i < 8; i++) {
      valueArray.push(data[bodyObjectArray[i]]);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: `ORDER!A1:H150`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [valueArray],
      },
    });

    // return result;
  } catch (error: any) {
    console.log(error);

    return {
      error: true,
      message: `error`,
    };
  }
}
