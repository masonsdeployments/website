import transporter from "@/config/email";

const sendEmail = async (text: string) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            cc: process.env.SMTP_CC1 + "," + process.env.SMTP_CC2,
            to: process.env.SMTP_TO,
            subject: "Contact Us Mail",
            text,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export default sendEmail;