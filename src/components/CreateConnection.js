import '../App.css';
import React from 'react'
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function SignUp(props) {
  const [formValue, setFormValue] = useState({
    ref:"",
 
  });
  const { objectString } = useParams();
  const receivedObject = JSON.parse(decodeURIComponent(objectString));

  // Parse the JSON string back to an object
  console.log(receivedObject)
const Add_New_Patient = async (e) => {

    // Set the headers with the token
 
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://localhost:3001/backend/patient/register`, {
        ref:formValue.ref,
        connection_id:receivedObject.connection_id
      });
      const respConnection = await Axios.post(`http://localhost:8031/connections/receive-invitation`,receivedObject.invitation);

      if (resp.data && respConnection.data) {

        window.location.href = "/signin";

      }
    } catch (error) {
      if (error.response.status === 404) {
        console.log("hello")
        toast.error("Please enter a valid reference")
        console.log(error)
      }
    }
  };
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <main class="bd-content order-1">
    <div class="bg-body title-bar">
      <div class="container-xxl d-block">
        <div class="row">
          <div class="col-sm-12 col-lg-5 offset-lg-3">
            <h1 class="display-1">Create a secure connection</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container-xxl pt-4">
      <div class="row">
        <div class="col-sm-12 col-lg-5 offset-lg-3">
 
          <form class="needs-validation mb-5" novalidate>
            <div class="row">
              <div class="col-12">
                <p class="fw-bold mb-4">
                  <span class="text-primary me-1">*</span>indicates required
                </p>
              </div>
             
              <div class="col-12">
                <div class="mb-3">
                  <label for="studyname" id="studynameLabel" class="form-label is-required">Reference</label>
                  <input type="text"
                   class="form-control" 
                    id="ref"
                    name="ref"
                    onChange={onChange}
                    value={formValue.ref}
                    autocomplete="given-name"   
         
                    required
                    />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="studynameFeedback" class="invalid-feedback">
                    Please enter a valid Reference
                  </div>
                </div>
  
 

 

                <button type="submit" class="btn btn-primary mt-2" onClick={Add_New_Patient}>Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  );
}

export default SignUp;
