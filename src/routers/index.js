import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './../documentation/swagger.json';
import userRoute from './employee_routers'
import managerRouter from './manager_router'

const router = express();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions))

router.get('/', (req, res) => {
    res.status(200).json({
        status:200,
        message:'welcome to awesomity backend challenge'
    })
})

router.use('/api/v1/user', userRoute);
router.use('/api/v1/user',managerRouter)

router.all('*', (req, res) => {
    res.status(404).json({
        status:404,
        message:"we don''t have this kind of router"
    })
});

export default router;
