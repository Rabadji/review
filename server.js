const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");

//####################################inapp####################################
app.get('/review',function(req,res){
    db.collection('review').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.put('/review/:value_id',function(req,res){
    const id=req.params.value_id;
    db.collection("review").update({_id:ObjectID(id)}, {value:req.body.value});
    res.send(req.body.value);
});
app.post('/review',function(req,res){
        var review={ value:req.body.value,     
        };
    db.collection('review').insert(review,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(review);
    })
})






MongoClient.connect("mongodb://localhost:27017/review",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(8888);
    
})