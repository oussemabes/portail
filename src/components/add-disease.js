import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";
export default function Add_disease(props) {
    const [formValue, setFormValue] = useState({
        disease_name: "",
        user_id:props.id
       
      });
      const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
      };
      const Add_New_Disease = async (e) => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        e.preventDefault();  
        try {
          const resp = await Axios.post(`http://localhost:3001/backend/disease/create`, {
            disease_name: formValue.disease_name,
            user_id: formValue.user_id,
          },{headers});
    
          if (resp.data) {

            toast.success("Add :)", {
              position: "bottom-center",
              duration: 5000,
            });
            window.location.href = "/";

          }
        } catch (error) {
          if (error.response) {
            console.log(error)
            toast.error("Please enter a valid disease");
            console.log(formValue.name,formValue.disease)
          }
        }
      };
    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${props.id}`}>
                Add disease
            </button>
            <div class="modal fade" id={`staticBackdrop-${props.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`staticBackdropLabel-${props.id}`} aria-hidden="true">
                <div class="modal-dialog modal-lg ">
                    <div class="modal-content " >
                        <main class="bd-content order-1">
                            <div class="bg-body title-bar">
                                <div class="container-xxl d-block">
                                    <div class="row">
                                        <div class="col-sm-12 col-lg-5 offset-lg-3">
                                            <h1 class="display-1">Add New Disease</h1>
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
                                                        <label for="studyname" id="studynameLabel" class="form-label is-required">Disease name</label>
                                                        <input type="text"
                                                            class="form-control"
                                                            id="name"
                                                            name="disease_name"
                                                            autocomplete="given-name"
                                                            onChange={onChange}
                                                            value={formValue.disease_name}
                                                            required
                                                        />
                                                        <div class="valid-feedback">
                                                            Looks good!
                                                        </div>
                                                        <div id="studynameFeedback" class="invalid-feedback">
                                                            Please enter a valid study name.
                                                        </div>
                                                    </div>
                                               

                                                 
                                                    <button type="submit" class="btn btn-primary mt-2" onClick={Add_New_Disease} >Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
