import nodemailer from 'nodemailer';

// Only validate SMTP env vars at runtime, not during build
const getTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("Missing required SMTP environment variables");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

// Create a lazy-loaded transporter
let _transporter: nodemailer.Transporter | null = null;

const transporter = {
  sendMail: async (options: nodemailer.SendMailOptions) => {
    if (!_transporter) {
      _transporter = getTransporter();
    }
    return _transporter.sendMail(options);
  },
};

export default transporter;