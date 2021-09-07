const router = require('express').Router()
const { Redirect } = require('react-router-dom');
const Patient = require('../models/patientSchema')
const nodemailer = require('nodemailer')
const {body, validationResult} = require('express-validator')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chtiouimalek159@gmail.com',
      pass: '22922773'
    },
    tls: { rejectUnauthorized: false }
  });


router.route('/').get((req, res)=>{
    Patient.find((err, users) => {
        if(err){
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.route('/add').post(
    body('email').isEmail().withMessage("Email n'est pas valide").exists(),
    body('cin').isLength({ min: 8, max: 8 }).withMessage("Champ doit etre 8 characters").exists(),
    (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    else {
    const { cin, first_name, last_name, date_nais, email, address, ills, priority, call_date } = req.body;
    const status = {
        stats: false
    }
    let patient = new Patient({
        cin,
        first_name,
        last_name,
        email,
        address,
        date_nais,
        ills,
        priority,
        status,
        call_date
    });
    patient.save()
        .then(() => { 
            res.json({
                cin,
                first_name,
                last_name,
                email,
                address,
                date_nais,
                priority,
                ills,
                status,
                call_date
            });
        })
        .then(()=> {
            transporter.sendMail({
                from: 'chtiouimalek159@gmail.com',
                to: patient.email,
                subject: `EVAX`,
                html: `
                    <p><h4>Hello ${patient.first_name} ${patient.last_name},</h4><br>
                        Your Registration ID is: <br>
                        <b> ${patient._id} </b> <br> 
                        Remember it
                    </p>`,
            }, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        })
        .catch(err => {
            res.status(400).send('adding new Patient failed');
        });
    }
});

router.route('/find/:cine').get((req, res) =>{
    Patient.find({cin: req.params.cine})
    .then(
        patient => res.json(patient)
    )
    .catch(
        err => res.status(400).json('Error: ' + err)
    )
});

router.route('/:cin').get((req, res) =>{
    Patient.find({cin: req.params.cin}, function(err, user) {
        if(err){
            res.status(400).json({error: err})
        }
        else {
            if(user.length === 0) {
                res.status(404).json({msg: "Utilisateur n'est pas Trouvé"})
            }
            else {
                res.status(200).json(user)
            }
        }
    })
});


module.exports = router;