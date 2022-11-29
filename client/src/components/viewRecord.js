import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
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
  records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:4000/entries/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
/* check if exits*/
function exists(field){
 if (field === ""){
    return "N/A"
 } else {
    return field
 }
}
/*returned output ui*/
 return ( 
   <div>
    <h3>View Record</h3>
    <br/>
    <table>
        <tr>
            <td>Date: {exists(form.date)}</td>
        </tr>
        <br/>
        <tr>
            <td>To: {exists(form.to)}</td>
            <td>From: {exists(form.from)}</td>
            <td>Duration: {exists(form.flight_duration)}</td>
        </tr>
        <br/>
        <tr>
            <td>Pilot In Command: {exists(form.pic)}</td>
            <td>Second In Command: {exists(form.sic)}</td>
        </tr>
        <br/>
        <tr>
            <td>Aircraft ID: {exists(form.aircraft_id)}</td>
            <td>Aircraft Type: {exists(form.aircraft_type)}</td>
        </tr>
        <br/>
        <tr>
            <td>Flight Training: {exists(form.flight_training)}</td>
            <td>Group Training: {exists(form.group_training)}</td>
            <td>Cross Country: {exists(form.cross_country)}</td>
            <td>Day or Night: {exists(form.day_night)}</td>
        </tr>
        <br/>
        <tr>
            <td>Actual Instrument: {exists(form.actual_instrument)}</td>
            <td>Simulated Instrument: {exists(form.simulated_instrument)}</td>
        </tr>
        <br/>

        <tr>
            <td>Day Landings: {exists(form.landing_day)}</td>
            <td>Night Landings: {exists(form.landing_night)}</td>
            <td>Single-engine Landing: {exists(form.single_landing)}</td>
            <td>Multi-engine Landing: {exists(form.multi_landing)}</td>
        </tr>
        <br/>
        <tr>
            <td>Notes: {form.notes}</td>
        </tr>
    </table>
     

  {/*
  SIMULATOR_FTD_OR_ATD: ""*/}
     
   </div>
 );
}