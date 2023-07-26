import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";
export default function Add_New_Study() {
    const [formValue, setFormValue] = useState({
        name: "",
        disease: "",
        discreption:""
      });
    const Add_New_Study = async (e) => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        e.preventDefault();
        try {
          const resp = await Axios.post(`http://localhost:3001/backend/studies/create`, {
            name: formValue.name,
            disease: formValue.disease,
            discreption:formValue.discreption
          },{headers});
    
          if (resp.data) {

            toast.success("Created :)", {
              position: "bottom-center",
              duration: 5000,
            });
            window.location.href = "/";

          }
        } catch (error) {
          if (error.response) {
            console.log(error)
            toast.error("Please enter a valid name/disease");
            console.log(formValue.name,formValue.disease)
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
            <h1 class="display-1">Add New study</h1>
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
                  <label for="studyname" id="studynameLabel" class="form-label is-required">Study name</label>
                  <input type="text"
                   class="form-control" 
                    id="name"
                    name="name"
                    autocomplete="given-name"   
                    onChange={onChange}
                    value={formValue.name}
                    required
                    />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="studynameFeedback" class="invalid-feedback">
                    Please enter a valid study name.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Disease" id="DiseaseLabel" class="form-label is-required">Disease</label>
                  <input type="text"
                   class="form-control" 
                   id="disease" 
                   name="disease"
                   aria-labelledby="DiseaseLabel DiseaseFeedback" 
                   autocomplete="family-name"
                   onChange={onChange}
                   value={formValue.disease}
                    required />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="DiseaseFeedback" class="invalid-feedback">
                    Please enter a valid disease.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="message" id="messageLabel" class="form-label is-required">Describe</label>
                  <button type="button" class="form-helper" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Help for text area">
                    <span class="visually-hidden">Helper for text area</span>
                  </button>
                  <textarea 
                  class="form-control"
                   id="discreption" 
                   name="discreption"
                   rows="5" 
                   placeholder="Describe your study here" 
                   aria-labelledby="messageLabel messageFeedback" 
                   onChange={onChange}
                   value={formValue.discreption}
                   required
                   ></textarea>
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="messageFeedback" class="invalid-feedback">
                    Please enter a valid message.
                  </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2" onClick={Add_New_Study}>Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  )
}
