import logo from './logo.svg';
import Navbar from "./components/Navbar"
import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Homepage from './components/home-page';
import Footer from './components/Footer';
import Loginpage from './components/Login-page';
import Sendstudydocument from "./components/send-study-document"
import Profile from './components/Profile';
import Loginpage_client from './components/Login-page_Client';
import CreateEvent from './components/Create-participants';
function App() {
  return (
    <>


      <Navbar/>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Sendstudydocument/:id" element={<Sendstudydocument />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Loginpage_client />} />
        <Route path="/invit" element={<CreateEvent/>} />



      </Routes>
      <Footer/>
    </>
  );
}

export default App;
