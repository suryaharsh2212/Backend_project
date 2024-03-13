import dotenv from "dotenv"

dotenv.config({
    path:"./env"
})
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "suryaharsh279@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

async function main() {
 
  const info = await transporter.sendMail({
    from: {
      name:"Techblink",
      address:'suryaharsh279@gmail.com'
    }, 
    to: ["suryaraj04266@gmail.com, 1nt22cs199.surya@nmit.ac.in, arindamkalita30@gmail.com"], 
    subject: "Login successfully", 
    text: "Welcome to Techblink", 
    html: "<b>Subject: Login Successfully - Welcome to Techblink </b>", 
  });

  console.log("Message sent: %s", info.messageId);
 
}

main().catch(console.error);