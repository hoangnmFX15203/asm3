const express = require('express');
require('dotenv').config();

const dbConnect = require('./config/dbconnect');
const userRoute = require('./routes/User');
const productRoute = require('./routes/Product');
const orderRouter = require('./routes/Order');
const authRoute = require('./routes/Auth');
const insertRoute = require('./routes/insert');
const cookiesParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookiesParser());
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRouter);
app.use('/api/insert', insertRoute);

app.listen(port, () => {
    console.log('server is online');
});
