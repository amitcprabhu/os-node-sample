'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.send("Hi All ");
});

app.get('/testdb', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/mydb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });

    res.send("database created");
});

app.get('/testcollection', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("customers", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
    res.send("Hi All, collection created......... ");
});



app.get('/addcollection', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.send("Hi All.............added new document in database !!!!!!!!! ");
});


app.get('/show', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    let data = {};

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            data = result;
            db.close();
        });
    });
    res.send(data);
});



app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});