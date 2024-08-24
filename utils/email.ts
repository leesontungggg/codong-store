import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codongmerch@gmail.com",
    pass: "kdkectlecuaswkei",
  },
});

export default transporter;
