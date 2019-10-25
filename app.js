const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// tell express to use body parser module and tell it we are parsing json data from client to server side
app.use(bodyParser.json());

const path = require('path');

const db = require("./db");
const collection = "todo";

// now db is set up(first create db file then come to this line)
// connect with database
db.connect((err)=>{
    if(err){
        console.log('unable to connect with database');
        process.exit(1);
    }else{
        app.listen(3000,()=>{
            console.log("connected to databse,app is listening on port 3000");
        });
    }
});
