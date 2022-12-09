import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/recordList.css";
 
const Record = (props) => (
 <tr>
  {/*get record info*/}
   <td>{props.record.pic}</td>
   <td>{props.record.sic}</td>
   <td>{props.record.flight_duration} Minutes</td>
   <td>{props.record.date}</td>
   <td>{props.record.to}</td>
   <td>{props.record.from}</td>
   <td>{props.record.aircraft_id}</td>
   <td> {/*edit/delete/viewfullrecord */}
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}>
       Delete
     </button> | 
     <Link className="btn btn-link" to={`/view/${props.record._id}`}>View</Link> 

   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:4000/entries/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);

 /*if delete button is clicked*/
 async function deleteRecord(id) {
   await fetch(`http://localhost:4000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 /*returned output ui*/
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>PIC</th>
           <th>SIC</th>
           <th>Flight Duration</th>
           <th>Date</th>
           <th>To</th>
           <th>From</th>
           <th>Aircraft ID</th>
           <th>Settings</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}