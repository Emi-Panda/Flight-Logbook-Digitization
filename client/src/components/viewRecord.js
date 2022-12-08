import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/viewRecord.css"
 
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
/*delete */
async function deleteRecord(id) {
  await fetch(`http://localhost:4000/${id}`, {
    method: "DELETE"
  });
} 
/* check if exits*/
function exists(field){
 if (field === ""){
    return <u>N/A</u>;
 } else {
    return <u>{field}</u>;
 }
}
/*returned output ui*/
 return ( 
   <div>
    <h3>View Record</h3>
    <br/>
    <table>
        <tr>
            <td><b>Date:</b> {exists(form.date)}</td>
            <td><b>To:</b> {exists(form.to)}</td>
            <td><b>From:</b> {exists(form.from)}</td>
            <td><b>Duration:</b> {exists(form.flight_duration) + ' Minutes'}</td>
        </tr>
        {/*break*/}
             
        <tr>
            <td><b>PIC: </b>{exists(form.pic)}</td>
            <td><b>SIC: </b>{exists(form.sic)}</td>
            <td><b>Aircraft ID: </b>{exists(form.aircraft_id)}</td>
            <td><b>Aircraft Type: </b>{exists(form.aircraft_type)}</td>
        </tr>
        {/*break*/}
        
        <tr>
            <td><b>Flight Training: </b>{exists(form.flight_training)}</td>
            <td><b>Group Training: </b>{exists(form.group_training)}</td>
            <td><b>Cross Country: </b>{exists(form.cross_country)}</td>
            <td><b>Day or Night: </b>{exists(form.day_night)}</td>
        </tr>
        {/*break*/}
             
        <tr>
            <td><b>Day Landings: </b>{exists(form.landing_day)}</td>
            <td><b>Night Landings: </b>{exists(form.landing_night)}</td>
            <td><b>Single-engine Landing: </b>{exists(form.single_landing)}</td>
            <td><b>Multi-engine Landing: </b>{exists(form.multi_landing)}</td>
        </tr>
        {/*break*/}
        <tr>
            <td><b>Actual Instrument: </b>{exists(form.actual_instrument)}</td>
            <td><b>Simulated Intrument: </b>{exists(form.simulated_instrument)}</td>
        </tr>
    </table>
    <table>
        <tr>
          <th>Notes</th>
        </tr>
        <tr>
            <td>{exists(form.notes)}</td>
        </tr>
    </table>
    <div className="buttons-container">
      <Link className="edit-button" to={`/edit/${params.id.toString()}`}> Edit </Link>
      <Link className="delete-button"
        onClick={() => {
          deleteRecord(params.id);
        }} to={`/`}>Delete</Link>
    </div>
   </div>
 );
}