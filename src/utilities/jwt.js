import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
export const signinToken = (params,time = process.env.EXPIRES_IN || "24h") =>{
    const token = jwt.sign(params,process.env.JWT_SECRET_KEY || "publicTokenKey",{ expiresIn : time })
    return token
}

export const decode = (token) =>{
  const payload = jwt.verify(token,process.env.JWT_SECRET_KEY || "publicTokenKey")
    return payload
}
