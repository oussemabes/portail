import Navbar from "../components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Loginpage from '../components/Login-page';
import Loginpage_client from '../components/Login-page_Client';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import NoAccess from "../components/Noacces";
import SignUp from "../components/CreateConnection";
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

        <Route path="/" element={<Loginpage />} />
        <Route path="/signin" element={<Loginpage_client />} />
        <Route path="/signup/:objectString" element={<SignUp />} />
        <Route path="/sendJustification/:id" element={<SignUp />} />

        <Route path="*" element={<NoAccess />} />



      </Routes>
      <Footer/>
    </>
  );
}

export default App;
