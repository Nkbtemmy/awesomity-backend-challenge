import express from 'express'
import managerControllers from '../controllers/manager_controllers';
import managerValidations from '../validators/manager_validation';
import checker from '../middlewares/checkers'

const app = express.Router();
app.post ('/signUp',managerValidations.signUp,checker.isExist,managerControllers.signUp)
app.put("/verification/:token",checker.verifyValidLink,managerControllers.emailVerification);
app.post('/login',managerValidations.login,checker.isUserFound,checker.isVerified,managerControllers.login);
app.post('/logout',checker.verifyToken,checker.isLoggedIn,managerControllers.logout);
app.put('/resetPassword/:token',managerValidations.resetPassword,checker.verifyValidLink,managerControllers.resetPassword);
app.post('/forgetPassword',checker.isUserFound,managerControllers.forgetPassword);
app.post('/upload',checker.verifyToken,checker.isLoggedIn,checker.isItManager,managerControllers.upload);

export default app;