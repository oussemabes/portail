import React, { useState, useEffect } from "react";
import axios from "axios"
import Tableparticipants from "./Table-participants";
export default function Card(props) {
    const [countparticipants, setCountparticipants] = useState(0);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios.get(`http://localhost:3001/backend/participants/countbystudy/${props.id}`, { headers })
            .then((res) => { setCountparticipants(Math.ceil(res.data[0].count)) })
            .catch((err) => setError(err));

    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios
            .get(
                `http://localhost:3001/backend/participants/displayParticipantsBystudy/${props.id}`
                , { headers })
            .then((res) => { setParticipants(res.data); console.log(res.data) })
            .catch((err) => setError(err));

    }, []);
    return (
        <div className="col-12 col-md-4 mb-4 ">

            <div class="card h-100" style={{ maxWidth: "450px" }}>

                <div class="card-body">
                    <h5 class="card-title">{props.name}</h5>
                    <h6 class="card-subtitle">Disease:{props.disease}</h6>
                    <p class="card-text">{props.discreption}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${props.id}`}>
                        Show details
                    </button>
                    <div class="modal fade" id={`staticBackdrop-${props.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`staticBackdropLabel-${props.id}`} aria-hidden="true">
                        <div class="modal-dialog modal-lg ">
                            <div class="modal-content " >
                                <div class="modal-header mb-1 pb-1">
                                    <h1 class="modal-title h5" id={`staticBackdropLabel-${props.id}`}>Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"><span class="visually-hidden">Close</span></button>
                                </div>
                                <div className="mr-2 pr-2">  <Tableparticipants participants={participants} countparticipants={countparticipants} study={props.name} /></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
