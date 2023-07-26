import Navbar from "../components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Homepage from '../components/home-page-admin';
import Footer from '../components/Footer';
import Sendstudydocument from "../components/send-study-document"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import NoAccess from "../components/Noacces";
import Add_New_Study from "../components/add-new-study";
function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState("false");
  const [userId, setUserId] = React.useState(0);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const user = jwtDecode(token);
   
      setUserId(user.id);
      setIsAuthenticated("true");
      console.log(isAuthenticated)
      console.log(user.id)
    }
  }, []);
  return (
    <>


      <Navbar isAuthenticated={isAuthenticated}/>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/Sendstudydocument/:id" element={<Sendstudydocument />} />
        <Route path="/create" element={<Add_New_Study/>} />

        <Route path="*" element={<NoAccess />} />


      </Routes>
      <Footer/>
    </>
  );
}

export default App;