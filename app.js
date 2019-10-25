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

app.get('/getTodos',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

app.put('/:id',(req,res)=>{
    const todoID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id:db.getPrimaryKey(todoID)},{$set:{todo:userInput.todo}},{returnOriginal:false},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});

app.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err){
           res(err);
        }else{
            res.json({result:result,document:result.ops[0]});
        }
    });
});

app.delete('/:id',(req,res)=>{
    const todoID = req.params.id;

    db.getDB().collection(collection).findOneAndDelete({_id:db.getPrimaryKey(todoID)},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});
