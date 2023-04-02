const express = require("express");
const server = express();

server.use(express.json());

//we will not have to use routers I don't think...

server.get("/", (req, res) => { //used for testing!
    res.json({ api: "up" });
  });
  
  server.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });