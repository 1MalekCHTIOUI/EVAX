const express = require('express')
const router = express.Router();
const User = require('../Models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../routes/middleware/auth')

router.route('/signin').post((req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({msg: "Please enter all fields"})
    }

    User.findOne({email})
        .then(user => {
            if(!user) res.status(400).json({msg: 'User Does Not Exist'})
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'invalid credentials'});
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })
        })
})


router.route('/').get((req, res)=>{
    User.find((err, users) => {
        if(err){
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.route('/update/:id').put((req, res)=>{
    const {first_name, last_name, email} = req.body
    User.findById(req.params.id).then(user => {
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.save()
            .then(() => {
                res.json({msg: "User updated"})
            })
            .catch(err => {
                res.status(400).json('Error: '+ err)
            })
        })
    })


router.route('/user').get(auth, (req, res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;