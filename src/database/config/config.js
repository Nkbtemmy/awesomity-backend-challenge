import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
if(process.env.NODE_ENV === 'development') {
    mongoose.connect(process.env.DB_CONNECT_DEV,
        {
           useNewUrlParser: true, 
           useUnifiedTopology: true 
       }, 
   (err) => {
       if (!err) {
           console.log('Successfully Established Connection with MongoDB')
       }
       else {
           console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
       }
   });
} else if(process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.DB_CONNECT_TEST,
        {
           useNewUrlParser: true, 
           useUnifiedTopology: true 
       }, 
   (err) => {
       if (!err) {
           console.log('Successfully Established Connection with MongoDB')
       }
       else {
           console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
       }
   });
}else{
    mongoose.connect(process.env.dB_connect,
        {
           useNewUrlParser: true, 
           useUnifiedTopology: true 
       }, 
   (err) => {
       if (!err) {
           console.log('Successfully Established Connection with MongoDB')
       }
       else {
           console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
       }
   });
}

module.exports = mongoose;