import userBot from "./userBot";

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.get('/', (req:any, res:any) => {
    res.send('API is running');
});
userBot();


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});