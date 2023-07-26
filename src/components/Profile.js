import React, { useState, useEffect } from "react";
import axios from "axios"
import jwtDecode from "jwt-decode";
import Add_disease from "./add-disease";
export default function Profile(props) {
  const [userInformation, SetUserInformation] = useState([]);
  const [error, setError] = useState(null);
  const [userDiseases, SetUserDiseases] = useState([]);
  const token = localStorage.getItem('token'); //
  const user = jwtDecode(token);

  useEffect(() => {

    const headers = {
      'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
      'Content-Type': 'application/json',
    };


    axios.get(`http://localhost:3001/backend/user/displaybyid/${user.id}`, { headers })
      .then((res) => {
        delete res.data[0].password;
        SetUserInformation(res.data[0])
      })
      .catch((err) => setError(err));

    axios.get(`http://localhost:3001/backend/disease/display/${user.id}`, { headers })
      .then((res) => {
        console.log(res.data.user_diseases)
        SetUserDiseases(res.data.user_diseases)
      })
      .catch((err) => setError(err));
    // Set the headers with the token


  }, [props.user_id]);
  return (
    <>

      <div class="container">
        <div class="main-body">
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>

              <li class="breadcrumb-item active" aria-current="page">User Profile</li>

            </ol>
          </nav>

          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>{userInformation.name}</h4>
                      {/* <button class="btn btn-primary">Message</button>  */}
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {userInformation.name}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {userInformation.email}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Age</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {userInformation.age}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Chronic disease</h6>
                    </div>
                    <div class="col-sm-9">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          {userDiseases.map((userDisease, index) => (
                            <span key={index}>
                              {userDisease}
                              {index !== userDiseases.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                            <Add_disease id={user.id}/>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {userInformation.gender}
                    </div>
                  </div>
                  <hr />
                  
                  <div class="row">
                    <div class="col-sm-12">
                      <a class="btn btn-info " target="__blank" >Edit</a>
                    </div>
                  </div>
                </div>
              </div>





            </div>
          </div>

        </div>
      </div>
    </>
  )
}
