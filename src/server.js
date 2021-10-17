import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers'

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(router);

const PORT = process.env.PORT || 2021;

server.listen(PORT,()=>{console.log(`survey's Server is listening on ${PORT} `)});

export default server;
