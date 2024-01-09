import nodemailer from "nodemailer";

export const sendVerifyMail = async (name, email, user_id) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.TRANSPORTERHOST,
        port: process.env.TRANSPORTERPORT,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.TRANSPORTERUSERMAIL,
          pass: process.env.TRANSPORTERUSERPASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.TRANSPORTERUSERMAIL,
        to: email,
        subject: "For Verification Mail",
        html: `<p> Hey ${name}, This is from userManagementTask. Please click the button below to verify your email:</p>
               <a href='https://ecfiletask.senjith.shop/userLogin?id=${user_id}' style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email has been sent:-", info.response);
        }
      }); 
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };