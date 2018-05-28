const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.get("/", (req, res, next) => {
    res.json({
        user: 'John Doe'
    })
})

app.listen(3030, (err) =>{
    console.log("listening to port 3030 aaaa");
})