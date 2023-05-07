import userBot from "./userBot";
import {prisma} from "./client";
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(morgan('dev'));
app.get('/', (req:any, res:any) => {
    res.send('API is running');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    prisma.$connect().then(() => {
        console.log(`[+] Database connected`);
        userBot();
    }).catch((error: any) => {
        console.log(`[-] Database not connected`);
        console.log(error);
    });
});