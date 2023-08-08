

import React, { useState, useEffect } from "react";
import axios from "axios"
export default function TableParticipants(props) {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [credential_definition_ids, SetCredential_definition_ids] = useState([])
    React.useEffect(() => {
        axios.get(`http://localhost:8021/credential-definitions/created`)
            .then((res) => { SetCredential_definition_ids(res.data.credential_definition_ids); console.log(res.data.credential_definition_ids); })
            .catch((err) => setError(err));
    }, []);
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
    useEffect(() => {
        axios.get(`http://localhost:3001/backend/patient/displayPatient`)
            .then((res) => { setPatients(res.data) })
            .catch((err) => setError(err));

    }, []);


    return (
        <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <caption class="visually-hidden">Boosted tables basic look</caption>
            <thead>
                <tr>
                    <th scope="col" style={{ color: "black" }}>#</th>
                    <th scope="col" style={{ color: "black" }}>patient reference</th>
                    <th scope="col" style={{ color: "black" }}>Justification</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient) => (
                    <tr>
                        <td><span style={{ color: "black" }}>{patient.id}</span></td>
                        <td><span style={{ color: "black" }}>{patient.ref}</span></td>

                        <td>
                            <button onClick={() => Add_New_Patient(patient)}>Send</button>
                        </td>


                    </tr>
                ))}
            </tbody>
        </table>
    )
}
