import transporter from "../../../utils/email";

export async function POST(request: Request) {
  console.log("request", request.body);

  console.log("Cronjob is finished");
  return Response.json({});
}
