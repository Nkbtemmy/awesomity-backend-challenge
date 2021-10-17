//copy and past this link in your browser : https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4M53SOejDQbPl-7Fim2YAdoGCgroeuzs4SyI7XBKEeyphNErP5YowKaEiwxw1EygZF-UjC91kpE8SWOPska2TrzgsZDFg
//then enable it
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendEmail= async (mailOptions)  => {
    //console.log(mailOptions);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : `${process.env.EMAILNAME_AUTH}`,
            pass : `${process.env.EMAILPASSWORD_AUTH}`

   
        }
    });
    const Options = {
        from: `Developer team ${process.env.EMAILNAME_AUTH}`,
        to: mailOptions.email,
        subject: mailOptions.subject,
        html: mailOptions.message
    
    }
    await transporter.sendMail(Options, (error) => {
        if (error) {
            console.log("email sent fails",error.message)
        } else {
            console.log("Email sent successfull")
        }
    })
}
