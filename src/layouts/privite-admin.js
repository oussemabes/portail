import Navbar from "../components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Homepage from '../components/home-page-admin';
import Footer from '../components/Footer';
import Sendstudydocument from "../components/send-study-document"

import React from "react";
import NoAccess from "../components/Noacces";
import Add_New_Study from "../components/add-new-study";
function App(props) {
 
  return (
    <>


      <Navbar isAuthenticated={"true"}/>
      <Routes>

        <Route path="/" element={<Homepage user_id={props.user_id}/>} />
        <Route path="/Sendstudydocument/:id" element={<Sendstudydocument />} />
        <Route path="/create" element={<Add_New_Study/>} />

        <Route path="*" element={<NoAccess />} />


      </Routes>
      <Footer/>
    </>
  );
}

export default App;