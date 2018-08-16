const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require("../config");

router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(existingUser) {
            res.json({
                success: false,
                message: "deu erro pq o email ja existe"
            })
        } else {
            user.save();
            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: "deu certo, toma seu token",
                token: token
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err;
        if (!user) {
            console.log("e aqui ?")
            res.json({
                success: false,
                message: "auth failed. user not found"
            });
        } else if(user) {
            console.log(user)
            var validPassword = user.comparePassword(req.body.password);

            console.log(validPassword);
            if(!validPassword) {
                res.json({
                    success:false,
                    message: "auth failed. password wrong"
                })
            } else {
                console.log("else")
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });
    
                res.json({
                    success:true,
                    message: 'enjoy ur token',
                    token: token
                })
            }
        } 
    })
})


module.exports = router;