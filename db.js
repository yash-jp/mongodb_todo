
// install mongodb drivers
const MongoClient = require("mongodb").MongoClient;
// we also require objectid from mongodb client
const ObjectID = require('mongodb').ObjectID;

// time to give dataabse a name
const dbname = "crud_mongodb";

// now make the url, to the default location where mongodb will be situating
const url = "mongodb://localhost:27017";

// the options that we can pass
const mongoOptions = {useNewUrlParser:true};

const state = {
    db:null
};

const connect = (cb) => {
    // if there's database connection
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err){
                cb(err);
            }else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};