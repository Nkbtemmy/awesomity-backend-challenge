import bcrypt, { hash } from "bcryptjs";
import { signinToken } from "../utilities/jwt";
import { codeGenerator } from "../utilities/codeGenerator";
import { User } from "../database/schema/employee";
import { sendEmail } from "../utilities/sendEmail";
import emailMocks from "../utilities/emailMocks";
const reader = require('xlsx')


export default class managerControllers{
   
    static async signUp(req,res) {
        try{ 
            const code = await codeGenerator();
            const {name,national_ID,phone,date_of_birth,email,password} = req.body; 
            const cipher = bcrypt.hashSync(password, 10);
            await User.create({ name,national_ID,code,phone,date_of_birth,email,status:"ACTIVE",position:"MANAGER",password:cipher,}).then(async(newUser)=>{
                        const emailVerificationToken = signinToken({ id: newUser._id, email: newUser.email})
                        const url=`/verification/${emailVerificationToken}`
                        const options ={
                          email,
                          subject: "your are receiving this email because you signup on our system",
                          message: await emailMocks.signUp(url),
                        }
                        await sendEmail(options);
                        newUser.password = undefined;
                        res.status(201).json({
                            status:'success',
                            user:newUser
                        })
                      }).catch((err)=>{
                        res.status(404).json({
                          status:404,
                          errorMessage:err.message,
                          message:"regitration fails"
                        })
                      })
           }
           catch(err){
            res.status(500).json({
                status:500,
                errorMessage:err.message,
                message:"server error"
            })
          }        
      };

    static async emailVerification(req, res) {
        try {
          User.findByIdAndUpdate(
            { _id:req.id },
            { isConfirmed: true },
            function(err, result) {
              if (err) {
                res.status(403).json({
                  status:403,
                  message:"Confirmesion went wrong"
                });
              } else {
                return res.status(200).json({
                  status: 200,
                  Message: "User confirmed Successfully!",
                });
              }
            }
          );
        } catch (error) {
            res.status(500).json({
              status: 500,
              errorMessage:error.message,
              message: "Internal server error!",
            });
        }
    
      }
    
    static async login(req,res){
        const {email,password} = req.body;
          const user=await User.findOne({email}).select('+password');  
            if(user == null || !bcrypt.compareSync(password, user.password)){
                return res.status(400).json({
                    status:400,
                    message:"Password OR username is invalid!"
                  });
                };
            User.findByIdAndUpdate(
                { _id:user._id },
                { isLoggedIn: true },
                function(err, result) {
                  if (err) {
                    res.status(401).json({
                      status:401,
                      message:err.message
                    });
                  } else {
                   //sending token
                    const token=signinToken({ id: result._id, email: result.email});
                    //console.log(result);
                    res.status(201).json({
                        status:201,
                        message:'Loggin is successfull',
                        token,
                    })
                  }
                }
              );
            
    }
    static async logout(req, res) {
        try {
            const userId = req.id;
            User.findByIdAndUpdate(
                { _id:userId },
                { isLoggedIn: false },
                function(err, result) {
                  if (err) {
                    res.status(401).json({
                      status:401,
                      message:err.message
                    });
                  } else {
                    res.status(200).json({
                        status:200,
                        message:'Logout successful',
                    })
                  }
                }
              );
            
        } catch (error) {
           // console.log(error)
            return res.status(500).json({
              status:500,
              message: 'Internal server error!'
            });
        }
    }

    static async forgetPassword(req, res) {
      const {email} = req.body;
      await User.findOne({email}).then(async(obj)=>{
        const token = signinToken({ id:obj._id, email: obj.email , password: obj.password },"2h");    
        const options ={
          email,
          subject: "Task force reset Password link",
          message:`<h2><i> click this link below to reset your password:</i>
          <a href=${req.protocol}://${req.get("host")}/resetPassword/${token}/>
           <span style="color:blue"> Click Here </span> </h2>  
           <br /> <br /> <span style="color:red"> 
           Remember that this link will be expired in two hours from now</span>`,
        }
        //console.log("token",)
        await sendEmail(options); 
          res.status(200).json({
            message: "email has been sent please change your password",
            token: token,
          });
        }).catch((error)=>{
        res.status(404).json({
          message:"can not find this employee",
          status:404,
          errorMessage:error.message
        })
      })

    }
  
    
    static async resetPassword(req, res) {
      try{
        const { password } = req.body;

        const cipher = bcrypt.hashSync(password, 10);
        const user_id = req.id;
        User.findByIdAndUpdate(
          user_id,
          { password: cipher },
          function(err, result) {
            if (err) {
              res.status(401).json({
                status:401,
                message:"password reset fails",
                message:err.message
              });
            } else {
              result.password = undefined;
              res.status(200).json({
                  status:200,
                  message:'password reset successfull',
                  user:result
              })
            }
          }
        );
      } catch (error) {
   
        res.status(500).json({
          status: 500,
          message: "Server Error",
          errorMessage:error.message,
        });
      }
    }

    static async upload(req,res){
      const doc = req.files.document;
      if(!doc){
        res.status(404).json({
          message:"upload document first",
          status:404,
        })
      }
      const file = reader.readFile(`${doc.tempFilePath}`)
      let data = []
      
      const sheets = file.SheetNames
      
      for(let i = 0; i < sheets.length; i++){
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        temp.forEach(async(resp) => {
          if(resp.email != undefined){
            data.push(resp.email);
          }
        })
      }

      data.forEach(async(email)=>{
        let option ={
          email,
          subject:"DEVELOPER Team",
          message:"Thank you for being with us in our society"
        }
        await sendEmail(option)
      })
      if(data.length){
        res.status(201).send({
          status:201,
          message:"emails send to employees"
        })
        res.status(401).send({
          status:401,
          message:"emails doesn't send to employees because no emails founds in doc"
        })
      }
    }
}