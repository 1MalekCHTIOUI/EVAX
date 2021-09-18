const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const path = require('path')
const vaccineRouter = require('./routes/vaccine');
const dashboardRouter = require('./routes/dashboard');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const mailRouter = require('./routes/sendmail')
const auth = require('./routes/middleware/auth')

app.use(cors());
app.use(express.json());
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,createIndexes:true, useUnifiedTopology: true}).then(() => console.log("MongoDB has been connected"))
.catch((err) => console.log(err));

app.use('/enroll', vaccineRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/sendmail', mailRouter)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "..", 'build', "index.html"));
  });

}

app.listen(PORT, () =>{
    console.log("Server is running on Port: " + PORT);
})