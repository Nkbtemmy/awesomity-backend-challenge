import bcrypt, { hash } from "bcryptjs";
import { signinToken } from "../utilities/jwt";
import { codeGenerator } from "../utilities/codeGenerator";
import { User } from "../database/schema/employee";
import { sendEmail } from "../utilities/sendEmail";
import emailMocks from "../utilities/emailMocks";

export default class managerControllers{
   
    static async signUp(req,res) {
        try{ 
            const code = codeGenerator();
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
    
}