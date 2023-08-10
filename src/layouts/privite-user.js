import Navbar from "../components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';

import React from "react";
import Client from "../components/Home-page-client"
import Profile from "../components/Profile"
import NoAccess from "../components/Noacces";
import SendHealthMes from "../components/Send-health-Mesurments"
function App(props) {

  return (
    <>


      <Navbar isAuthenticated={"true"} isadmin={"false"}/>
      <Routes>
        <Route path="/" element={<Client/>} />
        <Route path="/profile" element={<Profile userId={props.user_id}/>} />
        <Route path="/HealthMeasurements" element={<SendHealthMes userId={props.user_id}/>} />

        <Route path="*" element={<NoAccess />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
