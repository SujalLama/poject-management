const express = require('express');
const {connectDB} = require('./config/db');
require('dotenv').config();
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const contactRouter = require('./routes/contact')
const app = express();
//connecting database
connectDB();

// middlewares
// body parser
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/auth', authRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running in PORT: ${PORT} in ${process.env.NODE_ENV} mode.`))