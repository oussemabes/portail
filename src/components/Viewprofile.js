import React, { useState, useEffect } from "react";
import axios from "axios"

import { FcViewDetails } from "react-icons/fc";

export default function Viewprofile(props) {
  const [userInformation, SetUserInformation] = useState([]);
  const [error, setError] = useState(null);
  const [userDiseases, SetUserDiseases] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); //
    console.log(props.user_id)
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
      'Content-Type': 'application/json',
    };


    axios.get(`http://localhost:3001/backend/user/displaybyid/${props.user_id}`, { headers })
      .then((res) => {
        delete res.data[0].password; 
        delete res.data[0].name; 
        delete res.data[0].id;
        delete res.data[0].admin; 
        delete res.data[0].email; 

        SetUserInformation(res.data[0])
      })
      .catch((err) => setError(err));
    axios.get(`http://localhost:3001/backend/disease/display/${props.user_id}`, { headers })
      .then((res) => {
        console.log(res.data.user_diseases)
        SetUserDiseases(res.data.user_diseases)
      })
      .catch((err) => setError(err));

    // Set the headers with the token


  }, [props.user_id]);
  return (
    <>
      <FcViewDetails type="button" data-bs-toggle="modal" data-bs-target={`#exampleModal-${props.user_id}`} title="Show profile">
      </FcViewDetails>

      <div class="modal fade" id={`exampleModal-${props.user_id}`} tabindex="-1" aria-labelledby={`exampleModalLabel-${props.user_id}`} aria-hidden="true">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title h5" id={`exampleModalLabel-${props.user_id}`}>Ahmed informations</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal"><span class="visually-hidden">Close</span></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="main-body">
                  <div class="row gutters-sm">


                    <div class="col-md">
                      <div class="card mb-3">
                        <div class="card-body">
                          {Object.entries(userInformation).map(([key, value]) => (

                            <>

                              <div class="row">
                                <div class="col-sm-3">
                                  <h6 class="mb-0">{key}</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                  {value}
                                </div>
                              </div>

                              <hr />
                            </>
                          ))}

                          {/* <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Diseases</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                            {Object.entries(userDiseases).map(([key, value]) => ({value}))}
                            </div>
                          </div> */}
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Disease</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {userDiseases.map((userDisease, index) => (
                                <span key={index}>
                                  {userDisease}
                                  {index !== userDiseases.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>





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
