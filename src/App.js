import axios from "axios";
import Privite_admin from "./layouts/privite-admin";
import Privite_user from "./layouts/privite-user";
import Public from "./layouts/public";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import { BarLoader } from "react-spinners";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isadmin, setIsadmin] = React.useState('false');
  const [error, setError] = React.useState(null);
  const [userId, setUserId] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log(token);
      const user = jwtDecode(token);
      setUserId(user.id);
      console.log(userId);
      if (user) {
        setIsAuthenticated(true);
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        axios.get(`http://localhost:3001/backend/user/displaybyid/${user.id}`, { headers })
          .then((res) => {
            delete res.data[0].password;
            setIsadmin(res.data[0].admin);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false); // Always set loading to false after the request is complete
          });
      }
      console.log(isadmin);
    } else {
      setLoading(false);
    }
  }, []);

  // Render a loading state until authentication check is complete
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BarLoader color="#007bff" loading={loading} />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        isadmin==="true" ? <Privite_admin /> : <Privite_user isadmin={isadmin} />
      ) : (
        <Public />
      )}
    </>
  );
}

export default App;
