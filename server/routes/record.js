const express = require("express");
const recordRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;
 
 
recordRoutes.route("/entries").get(function (req, res) {
 let db_connect = dbo.getDb("LOGBOOK");
 db_connect
   .collection("entries")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
recordRoutes.route("/entries/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("entries")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
recordRoutes.route("/entries/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   date: req.body.date,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("entries").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("entries")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("entries").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;