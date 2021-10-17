import Joi from "joi";

export default class userValidations {

  static create(req, res, next) {
    const userValidationSchema = Joi.object({
        name: Joi.string().min(3).max(40).required(),
        national_ID: Joi.string().length(16).required(),
        phone: Joi.string().length(10).required(),
        date_of_birth: Joi.date().required(),
        email: Joi.string().email().required(),
        status: Joi.string().valid('ACTIVE','INACTIVE'),
        position: Joi.string().valid('MANAGER', 'DEVELOPER', 'DESIGNER', 'TESTER', 'DEVOPS').required(),
      });
      const authError = userValidationSchema.validate(req.body);
      if (authError.error) {
        return res
          .status(400)
          .json({ status:400,error: authError.error.details[0].message.replace(/"/g, '') });
      }
      return next();
    }
  
    static edit(req, res, next) {
      const userValidationSchema = Joi.object({
          id: Joi.string().min(5).required().messages({
            "any.required": 'id of employee is required',
            "any.only": "verify your employee ID and try again"
        }),
      });
      const authError = userValidationSchema.validate(req.params);
      if (authError.error) {
        return res
          .status(400)
          .json({ status:400,error: authError.error.details[0].message.replace(/"/g, '') });
      }
      return next();
    }


}