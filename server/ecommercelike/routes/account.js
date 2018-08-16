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

module.exports = router;