const express = require("express");
const server = express();
const nodemailer = require('nodemailer'); 

server.use(express.json());

//we will not have to use routers I don't think...

const transporter = nodemailer.createTransport({ //TODO: SET UP THIS APP IN GOOGLE CLOUD APPS THING I DONT FUCKING KNOW
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_SERVER_USER,
      pass: process.env.MAIL_SERVER_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

server.get("/", (req, res) => { //used for testing!
    res.json({ api: "up" });
  });

  server.post("/sendmail", (req, res, next)=>{
    //create a new mailSender object, pull out requisite fields from request,
    //then send that mailSender object to the to: field !

    //let from, to, subject, body = req.body; //will this work? destructuring needed but vscode is complaining about an errory

    let mailObject = {  
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
   }

    transporter.sendMail(mailObject, (error, info)=>{
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    })
  })
  
  server.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = server;