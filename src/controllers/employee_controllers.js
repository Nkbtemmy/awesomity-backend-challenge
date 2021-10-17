import bcrypt, { hash } from "bcryptjs";
import emailMocks from "../utilities/emailMocks";
import { sendEmail } from "../utilities/sendEmail";
import { codeGenerator } from "../utilities/codeGenerator";
import { User } from "./../database/schema/employee";

class employeeControllers {
    static async create(req,res) {
        try{ 
            const code = codeGenerator();
            const {name,national_ID,phone,date_of_birth,email,status,position} = req.body; 
            await User.create({
                name,national_ID,code,phone,date_of_birth,email,status,position,
            }).then(async(userInfo)=>{
              const options = {
                email,
                subject: "Awesomity Registration Successful",
                message:await emailMocks.created(userInfo),
              };
              sendEmail(options)
              userInfo.password = undefined;
              res.status(201).json({
                  status:201,
                  message:"Employee created successfull",
                  data:userInfo
              })
            }).catch((err)=>{
              res.status(404).json({
                status:404,
                message:"regitration fails",
                errorMessage:err.message
            })
            })
          }
           catch(err){
             console.log(err)
            res.status(500).json({
                status:500,
                message:"server error",
                errorMessage:err.message
            })
          }
        
    };
    static async edit(req,res){
      try {
        const {id} = req.params;
        await User.findByIdAndUpdate(id, req.body, { new: true }).then((user) => {
          if (!user) {
            return res.status(404).send({
              status:404,
              message: `employee with id ${id} doesn't found`,
            });
          }
          res.status(200).send({
            status:200,
            message:"employee with id ${id} edited successfull",
            user
          });
        })
        .catch((err) => {
          return res.status(404).send({
            status:404,
            errorMessage:err.message,
            message: "error while updating the employee",
          });
        });
      } catch (error) {
        res.status(500).json({
          status:500,
          message:"server error",
          errorMessage:error.message
        })
      }
    } 
    static async suspend(req,res){
      const {id} = req.params;
      await User.findOneAndDelete(id)
      try {
        const {id} = req.params;
        await User.findByIdAndUpdate(id, {status:"INACTIVE"}, { new: true }).then((user) => {
          if (!user) {
            return res.status(404).send({
              status:404,
              message: `employee with id ${id} doesn't found`,
            });
          }
          res.status(200).send({
            status:200,
            message:"employee with id ${id} suspended successfull",
            user
          });
        })
        .catch((err) => {
          return res.status(404).send({
            status:404,
            errorMessage:err.message,
            message: "error while activating the employee",
          });
        });
      } catch (error) {
        res.status(500).json({
          status:500,
          message:"server error",
          errorMessage:error.message
        })
      }
    }

    static async activate(req,res){
      try {
        const {id} = req.params;
        await User.findByIdAndUpdate(id, {status:"ACTIVE"}, { new: true }).then((user) => {
          if (!user) {
            return res.status(404).send({
              status:404,
              message: `employee with id ${id} doesn't found`,
            });
          }
          res.status(200).send({
            status:200,
            message:"employee with id ${id} activated successfull",
            user
          });
        })
        .catch((err) => {
          return res.status(404).send({
            status:404,
            errorMessage:err.message,
            message: "error while activating the employee",
          });
        });
      } catch (error) {
        res.status(500).json({
          status:500,
          message:"server error",
          errorMessage:error.message
        })
      }
    } 

    static async delete(req,res){
      const {id} = req.params;
      await User.findOneAndDelete({email:"nkbtemmy2@gmail.com"}).then((user) => {
        if (!user) {
          return res.status(404).send({
            status:404,
            message: `employee with id ${id} not found `,
          });
        }
        res.status(201).send({
          status:201, 
          message: "employee deleted successfully!" 
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status:500,
          errorMessage:err.message,
          message: "server error ",
        });
      });
    }
    
    static async search(req,res){
      try {
        const {search} = req.body;
        await User.find({$or: [{ name:search },{ position: search },{ phone: search },{ code: search }, { email: search }]}).then((result)=>{
          res.status(201).json({
            message:"List of employees found",
            status:201,
            employees:result
          })
        }).catch((error)=>{
         res.status(501).json({
          message:error.message,
          status:501,
         })
        })
      } catch (error) {
        res.status(500).json({
          message:error.message,
          status:500
        })
      }
    }


    // static async getAllEmployees(req,res){
    //   try {
    //     await User.find().then((result)=>{
    //       res.status(201).json({
    //         message:"List of employees found",
    //         status:201,
    //         employees:result
    //       })
    //     }).catch((error)=>{
    //      res.status(501).json({
    //       message:error.message,
    //       status:501,
    //      })
    //     })
    //   } catch (error) {
    //     res.status(500).json({
    //       message:error.message,
    //       status:500
    //     })
    //   }
    // }
    // static async getOneEmployee(req,res){
    //   try {
    //    await User.findById(req.params.id)
    //     .then((user) => {
    //       if (!user) {
    //         return res.status(404).send({
    //           status:404,
    //           message: "employee not found with id " + req.params.id,
    //         });
    //       }
    //       res.status(200).send({
    //         status:200,
    //         user
    //       });
    //     })
    //     .catch((err) => {
    //       return res.status(500).send({
    //         status:500,
    //         errorMessage:err.message,
    //         message: "Error retrieving employee with id " + req.params.id,
    //       });
    //     });
    //   } catch (error) {
    //     res.status(500).json({
    //       message:error.message,
    //       status:500
    //     })
    //   }
    // }

}
export default employeeControllers;