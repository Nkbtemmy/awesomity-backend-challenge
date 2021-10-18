import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import path from 'path';
import * as fs from 'fs';
import fileUpload from 'express-fileupload'
import router from './routers'

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '/footprint/access.log'), { flags: 'a' })
  }))
server.use(fileUpload({useTempFiles: true}));

server.use(router);

const PORT = process.env.PORT || 2021;

server.listen(PORT,()=>{console.log(`survey's Server is listening on ${PORT} `)});

export default server;
