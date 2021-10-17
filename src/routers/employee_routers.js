import express from 'express'
import userValidations from '../validators/employee_validations';
import UserControllers from '../controllers/employee_controllers'
import checker from '../middlewares/checkers'

const app = express.Router();
app.post('/create',userValidations.create,checker.isLoggedIn,checker.isItManager,checker.isExist,UserControllers.create)
app.put('/edit/:id',userValidations.edit,checker.isLoggedIn,checker.isItManager,checker.isExist,UserControllers.edit)
app.put('/suspend/:id',userValidations.edit,checker.isLoggedIn,checker.isItManager,checker.isExist,UserControllers.suspend)
app.put('/activate/:id',userValidations.edit,checker.isLoggedIn,checker.isItManager,checker.isExist,UserControllers.activate)
app.delete('/delete/:id',userValidations.edit,UserControllers.delete)
app.post('/search',checker.isLoggedIn,checker.isItManager,UserControllers.search)

//test
// app.get('/list',UserControllers.getAllEmployees)
// app.get('/:id',UserControllers.getOneEmployee)

export default app;