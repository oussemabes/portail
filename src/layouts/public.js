import Navbar from "../components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Loginpage from '../components/Login-page';
import Loginpage_client from '../components/Login-page_Client';

import React from "react";
import NoAccess from "../components/Noacces";
import SignUp from "../components/CreateConnection";
function App() {

  return (
    <>


      <Navbar isAuthenticated={"false"}/>
      <Routes>
      
        <Route path="/" element={<Loginpage_client />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/signup/:objectString" element={<SignUp />} />
        <Route path="/sendJustification/:id" element={<SignUp />} />

        <Route path="*" element={<NoAccess />} />



      </Routes>
      <Footer/>
    </>
  );
}

export default App;
