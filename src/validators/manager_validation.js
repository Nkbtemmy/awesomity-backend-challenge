import Joi from "joi";

export default class managerValidations {
    static signUp(req, res, next) {
        const userValidationSchema = Joi.object({
            name: Joi.string().min(3).max(40).required(),
            national_ID: Joi.string().length(16).required(),
            phone: Joi.string().length(10).required(),
            date_of_birth: Joi.date().required(),
            email: Joi.string().email().required(),
            status: Joi.string().valid('ACTIVE'),
            password: Joi.string().min(8).required(),
            confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({
              "any.required": 'confirm password is required',
              "any.only": "comfirm password must be same as password"
            }),
          });
          const authError = userValidationSchema.validate(req.body);
          if (authError.error) {
            return res
              .status(400)
              .json({ status:400,error: authError.error.details[0].message.replace(/"/g, '') });
          }
          return next();
        }

    static login (req, res, next){
        const login = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
        const { error } = login.validate(req.body);
        if (error) {
            return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
            });
        }
        next();
    }; 
    
    static async resetPassword(req,res,next){
        const resetPasswords = Joi.object().keys({
            password: Joi.string().min(8).required(),
            confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({
                "any.required": 'confirm password is required',
                "any.only": "comfirm password must be same as password"
            }),
        });
        const { error } = resetPasswords.validate(req.body);
        if (error) {
            return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
            });
        }
        next();
    }
}