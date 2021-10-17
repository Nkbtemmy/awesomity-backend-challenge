import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import path from 'path';
var fs = require('fs')
import router from './routers'

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
  }))

server.use(router);

const PORT = process.env.PORT || 2021;

server.listen(PORT,()=>{console.log(`survey's Server is listening on ${PORT} `)});

export default server;
