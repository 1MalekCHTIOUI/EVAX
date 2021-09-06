const express = require('express')
const router = express.Router();
const User = require('../Models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('./middleware/auth')

router.route('/:id').delete(auth, (req, res) =>{
    let id = req.params.id;
    User.findByIdAndDelete(req.params.id).then(()=>{
        res.json({msg: 'User deleted'})
    })
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/signup').post((req, res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    if(!last_name || !first_name || !email || !password){
        return res.status(400).json({msg: "Veuillez saisir tous les champs"})
    }
    User.findOne({email})
    .then(user => {
        if(user) res.status(400).json({msg: "L'utilisateur déjà existe"})
    })

    const newUser = new User({
        first_name,
        last_name,
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            }
                        })
                    }
                )

            })
        })
    })
})


module.exports = router;