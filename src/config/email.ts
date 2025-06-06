import nodemailer from 'nodemailer';

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Missing required SMTP environment variables');
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

// Verify connection configuration
transporter.verify(function (error) {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log("SMTP server is ready to take our messages");
    }
});

export default transporter;