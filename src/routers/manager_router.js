import express from 'express'
import managerControllers from '../controllers/manager_controllers';
import managerValidations from '../validators/manager_validation';
import checker from '../middlewares/checkers'

const app = express.Router();
app.post ('/signUp',managerValidations.signUp,checker.isExist,managerControllers.signUp)
app.put("/verification/:token",checker.verifyValidLink,managerControllers.emailVerification);
app.post('/login',managerValidations.login,checker.isUserFound,checker.isVerified,managerControllers.login);
app.post('/logout',checker.verifyToken,checker.isLoggedIn,managerControllers.logout);

export default app;