import React from "react";
import "./CSS/App.css" //css
import { Route, Routes } from "react-router-dom";
 
//Import components
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import ViewRecord from "./components/viewRecord";
import LoginPage from "./components/login";
 
const App = () => {
 return (
  <div>
    <title>FLB</title>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/view/:id" element={<ViewRecord />} />
       <Route path="/login" element={<LoginPage />} />
     </Routes>
  </div>
 );
};
 
export default App;