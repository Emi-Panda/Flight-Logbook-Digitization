import React, { useState } from "react";
import { useNavigate } from "react-router";
import AIRPORTSLIST from "./AIRPORT LIST.json"
let AIRPORTS = AIRPORTSLIST.AIRPORTS;
 
export default function Create() {
 const [form, setForm] = useState({
  date: "",
  aircraft_type: "",
  aircraft_id: "",
  from: "",
  to: "",
  flight_duration: "",
  pic: "",
  sic: "",
  flight_training: "",
  group_training: "",
  SIMULATOR_FTD_OR_ATD: "",
  cross_country: "",
  day_night: "",
  actual_instrument: "",
  simulated_instrument: "",
  landing_day: "",
  landing_night: "",
  single_landing: "",
  multi_landing: "",
  notes: "",
 });
 const navigate = useNavigate();
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
 
   const newEntry = { ...form };
 
   await fetch("http://localhost:4000/entries/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newEntry),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({date: "", aircraft_type: "", aircraft_id: "", from: "",
            to: "", flight_duration: "", pic: "", sic: "", flight_training: "",
            group_training: "", SIMULATOR_FTD_OR_ATD: "", cross_country: "", 
            day_night: "", actual_instrument: "", simulated_instrument: "", 
            landing_day: "", landing_night: "", single_landing: "", multi_landing: "",
            notes: "",
    });
   navigate("/");
 }
 
 return (
  <div>
    <h3>Create New Record</h3>
    <br></br>
    <form onSubmit={onSubmit}>
      {/*Location/time*/}
      <div className="form-group"> 
        <div className="form-check form-check-inline">
          {/* Date */}
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}/>
          {/* From / To */}
          <label htmlFor="from">From:</label>
          <select
            type="text"
            className="form-control"
            id="from"
            value={form.from}
            onChange={(e) => updateForm({ from: e.target.value })}>
              <option value = "">Select...</option>
              {AIRPORTS.map((x) => <option value={x}>{x}</option>)}
            </select>
          <label htmlFor="to">To:</label>
          <select
            type="text"
            className="form-control"
            id="to"
            value={form.to}
            onChange={(e) => updateForm({ to: e.target.value })}>
              <option value = "">Select...</option>
              {AIRPORTS.map((x) => <option value={x}>{x}</option>)}
            </select>
          {/* Durration of Flight */}
          <label htmlFor="flight-durration">Flight Durration (Minutes):</label>
          <input
            type="double"
            placeholder= "0.0"
            max="24"
            min="0"
            className="form-control"
            id="flight-durration"
            value={form.flight_duration}
            onChange={(e) => updateForm({ flight_duration: e.target.value })}/>
          {/* Landings */}
          <label htmlFor="day_landing">Day Landings:</label>
          <input
            type="number"
            placeholder= "0"
            className="form-control"
            id="day"
            value={form.landing_day}
            onChange={(e) => updateForm({ landing_day: e.target.value })}/>
          <label htmlFor="night_landing">Night Landings:</label>
          <input
            type="number"
            placeholder= "0"
            className="form-control"
            id="landing_night"
            value={form.landing_night}
            onChange={(e) => updateForm({ landing_night: e.target.value })}/>
            {/*end*/}
        </div>
      </div>

      {/* -----------------------------------------------------*/}

      <br/><br/><br/>
      {/*Pilot Info*/}
      <div className="form-group"> 
        <div className="form-check form-check-inline">
          {/* PIC */}
          <label htmlFor="to">PIC:</label>
          <input
            type="text"
            className="form-control"
            id="pic"
            value={form.pic}
            onChange={(e) => updateForm({ pic: e.target.value })}/>
          {/*SIC*/}
          <label htmlFor="to">SIC:</label>
          <input
            type="text"
            className="form-control"
            id="sic"
            value={form.sic}
            onChange={(e) => updateForm({ sic: e.target.value })}/>
        </div>
      </div>

      {/* -----------------------------------------------------*/}

      <br/><br/><br/>
      {/*Plane Info*/}
      <div className="form-group"> 
        {/* Aircraft Type */}
        <div className="form-check form-check-inline">
          <label htmlFor="aircraft-type">Aircraft Type:</label>
          <input
            type="text"
            className="form-control"
            id="aircraft-type"
            value={form.aircraft_type}
            onChange={(e) => updateForm({ aircraft_type: e.target.value })}/>
          {/* Aircraft Ident */}
          <label htmlFor="aircraft-id">Aircraft Id:</label>
          <input
            type="text"
            className="form-control"
            id="aircraft-id"
            value={form.aircraft_id}
            onChange={(e) => updateForm({ aircraft_id: e.target.value })}/>
        </div>
      </div>
      <br/><br/>
      {/*Notes*/}
      <div className="form-group"> 
        <label htmlFor="notes">Notes:</label>
            <input
              type="text"
              className="form-control"
              id="notes"
              value={form.notes}
              onChange={(e) => updateForm({ notes: e.target.value })}/>
      </div>


    <br/><br/>
    {/*Upload record button*/}
    <div className="form-group">
         <input
           type="submit"
           value="Upload Entry"
           className="btn btn-primary"/>
    </div>
    </form>
  </div>
 );
}