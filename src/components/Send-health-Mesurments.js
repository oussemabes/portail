import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";
import jwtDecode from "jwt-decode";

export default function SendHealthMesurments() {
    const token = localStorage.getItem('token'); //
    const user = jwtDecode(token);
    const [formValue, setFormValue] = useState({
        user_id:user.id,
        date: "",
        heart_beat: "",
        temperature: "",
        oxygen_saturation: "",
        blood_pressure: ""
    });
    const Add_New_health_mesurments = async (e) => {
        const currentDate = new Date();
         const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const token = localStorage.getItem('token'); //
        console.log(formValue)
        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        e.preventDefault();
        try {
            const resp = await Axios.post(`http://localhost:3001/backend/HealthMeasurement/create`, {
                user_id:formValue.user_id,
                date:`${year}-${month}-${day}`,
                heart_beat: formValue.heart_beat,
                temperature: formValue.temperature,
                oxygen_saturation: formValue.oxygen_saturation,
                blood_pressure: formValue.blood_pressure
  
            }, { headers });

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
                toast.error("Please come back tomorow");
                console.log(formValue.name, formValue.disease)
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
                            <h1 class="display-1">Add Today measurements </h1>
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
                                        <label for="studyname" id="studynameLabel" class="form-label is-required">Heart beat</label>
                                        <input type="number"
                                            class="form-control"
                                            id="name"
                                            name="heart_beat"
                                            autocomplete="given-name"
                                            onChange={onChange}
                                            value={formValue.heart_beat}
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
                                        <label for="Disease" id="DiseaseLabel" class="form-label is-required">Temperature</label>
                                        <input type="number"
                                            class="form-control"
                                            id="disease"
                                            name="temperature"
                                            aria-labelledby="DiseaseLabel DiseaseFeedback"
                                            autocomplete="family-name"
                                            onChange={onChange}
                                            value={formValue.temperature}
                                            required />
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div id="DiseaseFeedback" class="invalid-feedback">
                                            Please enter a valid disease.
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="Disease" id="DiseaseLabel" class="form-label is-required">Oxygen saturation</label>
                                        <input type="number"
                                            class="form-control"
                                            id="disease"
                                            name="oxygen_saturation"
                                            aria-labelledby="DiseaseLabel DiseaseFeedback"
                                            autocomplete="family-name"
                                            onChange={onChange}
                                            value={formValue.oxygen_saturation}
                                            required />
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div id="DiseaseFeedback" class="invalid-feedback">
                                            Please enter a valid disease.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Disease" id="DiseaseLabel" class="form-label is-required">Blood pressure</label>
                                        <input type="number"
                                            class="form-control"
                                            id="disease"
                                            name="blood_pressure"
                                            aria-labelledby="DiseaseLabel DiseaseFeedback"
                                            autocomplete="family-name"
                                            onChange={onChange}
                                            value={formValue.blood_pressure}
                                            required />
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div id="DiseaseFeedback" class="invalid-feedback">
                                            Please enter a valid disease.
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-2" onClick={Add_New_health_mesurments}>Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
