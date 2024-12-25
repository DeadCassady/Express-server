const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('../routers/routes');
const path = require('path');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const config = require('../config');

   const app = express();


   app.use(express.static(path.join(__dirname, 'public')));

   app.use(
    session({
      store: new FileStore({ path: "./sessions" }),
      secret: "cat_parrot_fish",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 36000, sameSite: "lax", secure: false }, // 100 hours
    })
  );
  
 mongoose.connect(config.mongodbUri)
 const db = mongoose.connection
 db.on('error', (error: Error)=> console.error(error))
 db.once('open', ()=> console.log('connected to db'))             

app.use(bodyParser.json());

app.use('/api/v2/router', routes)

app.listen(config.port, ()=>{
    console.log("Server is listening on http://localhost:3005");
    })
export {} 