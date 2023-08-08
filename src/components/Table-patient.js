
import React, { useState, useEffect } from "react";
import axios from "axios"

import FaEye from "./Viewprofile";
import { FaFileUpload } from "react-icons/fa";

import { BiCommentDots, BiLoader } from "react-icons/bi";
export default function Tableusers(props) {
    const [username, SetUsername] = useState([]);
  const Link =(user_id)=>{
    return `http://localhost:3000/Sendstudydocument/${user_id}`
  }
  const [credential_definition_ids, SetCredential_definition_ids] = useState([])

  const Add_New_Patient = async (patient) => {
    console.log(patient)
    console.log(credential_definition_ids[0])
    console.log(patient.connection_id)
    const SetSendoffer = {
        "connection_id": patient.connection_id,
        "auto_issue": false,
        "auto_remove": false,
        "comment": "string",
        "cred_def_id": credential_definition_ids[0],
        "credential_preview": {
            "@type": "issue-credential/1.0/credential-preview",
            "attributes": [
                {
                    "name": "ref",
                    "value": `${patient.ref}`
                },
                {
                    "name": "disease",
                    "value": patient.disease
                },
                {
                    "name": "gender",
                    "value": patient.gender
                },
                {
                    "name": "date",
                    "value": patient.date
                }

            ]
        },
        "trace": true
    }
    console.log(SetSendoffer)
    try {



        const respagent = await axios.post(`http://localhost:8021/issue-credential/send-offer`, SetSendoffer);

        if (respagent.data) {
            const user_information = {
                "ref": `${patient.ref}`,
                "name": "Portial patient",
                "email": `${patient.ref}@portail.com`,
                "password": `${patient.connection_id}`,
                "admin": "false",
                "age": 30,
                "gender": `${patient.gender}`
            }
            const PatientAddToUsers = await axios.post(`http://localhost:3001/backend/user/register`, user_information);
            if (PatientAddToUsers) {
            
                const resp = await axios.post(`http://localhost:3001/backend/disease/create`, {
                    disease_name: patient.disease,
                    user_id: PatientAddToUsers.data.userId,
                });
                if (resp){
                    window.location.href="/"
                }
                
            }

        }
    } catch (error) {
        if (error.response) {
            console.log("hello")
            console.log(error)
        }
    }
};
  return (
    <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <caption class="visually-hidden">Boosted tables basic look</caption>
    <thead>
        <tr>
            <th scope="col" style={{ color: "black" }}>#</th>
            <th scope="col" style={{ color: "black" }}>Patient reference</th>
            <th scope="col" style={{ color: "black" }}>Details</th>
            <th scope="col" style={{ color: "black" }}>Comment</th>
            <th scope="col" style={{ color: "black" }}>Action</th>
        </tr>
    </thead>
    <tbody>
        {props.users.map((user) => (
        <tr>
            <td><span style={{ color: "black" }}>{user.id}</span></td>
            <td><span style={{ color: "black" }}>{user.ref}</span></td>
            <td><h3><FaEye style={{ color: "black" }} user_id={user.id} /> </h3></td>
            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
            <td>  <a title="send study document" href={Link(user.id)} ><h3> <FaFileUpload title="send study document" style={{color:"black"}}>Send Invitation</FaFileUpload></h3> </a> </td>


        </tr>
))}
{props.patients.map((patient) => (
        <tr>
            <td><span style={{ color: "black" }}>{patient.id}</span></td>
            <td><span style={{ color: "black" }}>{patient.ref}</span></td>
            <td><h3><FaEye style={{ color: "black" }} user_id={patient.id} /> </h3></td>
            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
            <td>           <button type="button" class="btn btn-primary" onClick={()=>Add_New_Patient(patient)}>
                                        Send Credential
                                    </button> </td>


        </tr>
))}

    </tbody>
</table>
  )
}
