const express = require("express");
const server = express();
const nodemailer = require('nodemailer'); 
require('dotenv').config();

server.use(express.json());

//we will not have to use routers I don't think...

//TODOS: ABSTRACT AWAY SOME OF THIS CONFIG STUFF!
const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_SERVER_USER,
      pass: process.env.MAIL_SERVER_PASSWORD,
    }
  });

server.get("/", (req, res) => { //used for testing!
    res.json({ api: "up" });
  });

  server.post("/sendmail", (req, res, next)=>{
    //create a new mailSender object, pull out requisite fields from request,
    //then send that mailSender object to the to: field !

    let mailObject = {  
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
   }
   async function send(){
    try {
      await transporter.sendMail(mailObject);
      res.json({message: "Success!", status: 200}); //lookup proper status code for this!
    } catch (err) {
     console.log(err);
    }
   }

   send();
   
  })
  
  server.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = server;