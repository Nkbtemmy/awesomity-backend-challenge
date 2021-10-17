const url =`https://www.awesomity.rw/`
class emailMocks{
    static async created(mailOptions){
        return `
        <div style="display:flex;justify-content:center">
        <div style="">
        <h3>Hello ${mailOptions.name}</h3>
        <p>you have been added to campany <b>awesomity rwanda</b> as one of employees registered <br> to use online platform</p></div>
        </div>
        `
    }
    static async signUp(mailOptions) {
        let newUrl = url + mailOptions
        return `
            <div style="width:80%;border:1px solid black;margin :auto;border-radius: 23px;padding-left:32px;">
            <div style="text-align:center;padding-top: 23px;color:#808080 ">
            <h1>Message</h1>
            <hr style="width:50%"/>
            </div>
            <div >
            <h2>hello Sir/Madam<h2><br>
            <p>Thanks for registering on our site. Please click the link below to verify your account.</p>
            <p><a href="${newUrl}" style="font-size:12px">${newUrl}</a></p>
                    <p style="color:red;font-size:15px">Please note that if you do not verify your email address within 3 days, the verification code above will expire and you will need to re-register again.</p>
            </div>
        </div>
    `
    }

}
export default emailMocks