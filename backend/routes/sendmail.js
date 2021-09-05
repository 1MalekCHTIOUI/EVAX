const router = require('express').Router()
const { Redirect } = require('react-router-dom');
const Patient = require('../models/patientSchema')
const nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chtiouimalek159@gmail.com',
      pass: '22922773'
    },
    tls: { rejectUnauthorized: false }
  });


router.route("/:email").post((req, res) => {
    const {code} = req.body;
    transporter.sendMail({
        from: 'chtiouimalek159@gmail.com',
        to: req.params.email,
        subject: `EVAX`,
        html: `
            <p><h4>Salut, </h4><br>
                Votre Code de Verification Est: <br>
                <b> ${code} </b> <br> 
                Remember it
            </p>`
    }, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log('Email sent to: ' + code);
        }
      });
})

module.exports = router;
