const express = require("express");
const path = require("path");
const { name } = require("pug");
const bodyparser = require('body-parser');
const app = express();
const port = 80;
const fs = require('fs');


// DEFINIGN MONGOOSE AND CONNECTING THE LOCAHOST SERVER
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://0.0.0.0/contactDance',{useNewUrlParser:true});

}

// DEFINING THE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

// DEFINING THE MODEL
const contact = mongoose.model('contact', contactSchema);

// SETTING EXPRESS AS STATIC
app.use("/static",express.static('static'))
app.use(express.urlencoded())

// SETTING THE VIEW ENGINE AS PUG
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// GET REQUEST FOR HOME
app.get("/",(req,res)=>{
    const con = ""
    const params = {}
    res.status(200).render('home.pug');
})

// GET REQUEST FOR CONTACT
app.get("/contact",(req,res)=>{
    const con = ""
    const params = {}
    res.status(200).render('contact.pug');
})

// POST REQUEST FOR CONTACT AND SAVE TO THE DATABASE
app.post("/contact",(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})

// SHOWING THAT APP STARTED SUCCESFULLY
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
})