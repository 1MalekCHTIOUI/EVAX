const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const vaccineRouter = require('./routes/vaccine');
const dashboardRouter = require('./routes/dashboard');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const mailRouter = require('./routes/sendmail')
const auth = require('./routes/middleware/auth')
const db = require('../config/default.json').mongoURI;
require("dotenv").config();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/enroll', vaccineRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use("/sendmail", mailRouter)
app.use(express.static(path.join(__dirname, "client", "build")))
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true});

app.listen(PORT, () =>{
    console.log("Server is running on Port: " + PORT);
})