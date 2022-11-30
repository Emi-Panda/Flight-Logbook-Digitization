const express = require("express");
const recordRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;
 
/*get all records*/
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

/*single record from ID*/
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
 
/*add record to database*/
recordRoutes.route("/entries/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {  
    date: req.body.date,
    aircraft_type: req.body.aircraft_type,
    aircraft_id: req.body.aircraft_id,
    from: req.body.from,
    to: req.body.to,
    flight_duration: req.body.flight_duration,
    pic: req.body.pic,
    sic: req.body.sic,
    flight_training: req.body.flight_training,
    group_training: req.body.group_training,
    SIMULATOR_FTD_OR_ATD: req.body.SIMULATOR_FTD_OR_ATD,
    cross_country: req.body.cross_country,
    day_night: req.body.day_night,
    actual_instrument: req.body.actual_instrument,
    simulated_instrument: req.body.simulated_instrument,
    landing_day: req.body.landing_day,
    landing_night: req.body.landing_night,
    single_landing: req.body.single_landing,
    multi_landing: req.body.multi_landing,
    notes: req.body.notes,
 };
 db_connect.collection("entries").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
/*update record*/
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    date: req.body.date,
    aircraft_type: req.body.aircraft_type,
    aircraft_id: req.body.aircraft_id,
    from: req.body.from,
    to: req.body.to,
    flight_duration: req.body.flight_duration,
    pic: req.body.pic,
    sic: req.body.sic,
    flight_training: req.body.flight_training,
    group_training: req.body.group_training,
    SIMULATOR_FTD_OR_ATD: req.body.SIMULATOR_FTD_OR_ATD,
    cross_country: req.body.cross_country,
    day_night: req.body.day_night,
    actual_instrument: req.body.actual_instrument,
    simulated_instrument: req.body.simulated_instrument,
    landing_day: req.body.landing_day,
    landing_night: req.body.landing_night,
    single_landing: req.body.single_landing,
    multi_landing: req.body.multi_landing,
    notes: req.body.notes,
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
 
/*delete single record*/
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