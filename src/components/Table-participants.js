
import {

    MdCheckCircleOutline

} from "react-icons/md";
import {  BiLoader } from "react-icons/bi";

import { TbXboxX } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import axios from "axios"
export default function TableParticipants(props) {
    const [username, SetUsername] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); //
        for (var i = 0; i < props.countparticipants; i++) {
            axios.get(`http://localhost:3001/backend/user/displaybyid/${props.participant[i].user_id}`, { headers })
                .then((res) => { SetUsername(res.data[0].name) })
                .catch((err) => setError(err));
        }

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };


    }, []);

    async function test(user_id) {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios.get(`http://localhost:3001/backend/user/displaybyid/${user_id}`, { headers })
            .then((res) => { SetUsername(res.data[0].name) })
            .catch((err) => setError(err));
        return username
    };

    return (
        <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <caption class="visually-hidden">Boosted tables basic look</caption>
            <thead>
                <tr>
                    <th scope="col" style={{ color: "black" }}>#</th>
                    <th scope="col" style={{ color: "black" }}>User reference</th>
                    <th scope="col" style={{ color: "black" }}>Study name</th>
                    <th scope="col" style={{ color: "black" }}>Status</th>
                    <th scope="col" style={{ color: "black" }}>Study document</th>
                </tr>
            </thead>
            <tbody>
                {props.participants.map((participant) => (
                    <tr>
                        <td><span style={{ color: "black" }}>{participant.id}</span></td>
                        <td><span style={{ color: "black" }}>{participant.ref}</span></td>
                        <td><span style={{ color: "black" }}>{props.study}</span></td>

                        <td>            {participant.state === 'pending' ? (
                            <h3><BiLoader style={{ color: "black" }} /> </h3>
                        ) : participant.state === 'accepted' ? (
                            <h3><MdCheckCircleOutline style={{ color: "black" }} /> </h3>
                        ) : (
                            <h3><TbXboxX style={{ color: "black" }} /> </h3>
                        )}</td>
                        <td><a href={participant.document} >click here</a></td>


                    </tr>
                ))}
            </tbody>
        </table>
    )
}
