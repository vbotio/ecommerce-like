const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const cors = require("cors");

mongoose.connect(config.database, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("connected to database")
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());


app.get("/", (req, res, next) => {
    res.json({
        user: 'John Doe'
    })
})

app.listen(config.port, (err) =>{
    console.log("listening to port " + config.port);
})