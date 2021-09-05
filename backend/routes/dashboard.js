const router = require('express').Router()

const Patient = require('../models/patientSchema')
const auth = require('../routes/middleware/auth')
router.route('/').get((req, res)=>{
    Patient.find((err, users) => {
        if(err){
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
router.route('/:id').delete((req, res) => {
    Patient.findByIdAndDelete(req.params.id, (err, users) => {
        if(err){
            console.log(err);
        } else {
            res.json({msg: "User succesfully deleted"});
        }
    });
});


router.route('/:id').get((req, res) =>{
    Patient.findById(req.params.id)
    .then(
        patient => res.json(patient)
    )
    .catch(
        err => res.status(400).json('Error: ' + err)
    )
});
router.route('/:id').put((req, res) =>{
    Patient.findById(req.params.id).then(patient => {
        patient.cin = req.body.cin;
        patient.first_name = req.body.first_name;
        patient.last_name = req.body.last_name;
        patient.date_nais = req.body.date_nais,
        patient.email = req.body.email,
        patient.address = req.body.address,
        patient.ills = req.body.ills,
        patient.status = req.body.status
        patient.call_date = req.body.call_date
        patient.save()
                .then(() => {
                    res.json({msg: "Patient updated"})
                })
                .catch(err =>{
                    res.status(400).json('Error: '+err)
                });
    });
});
module.exports = router;