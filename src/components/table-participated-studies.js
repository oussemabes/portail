import React, { useState} from "react";
import axios from "axios"

import { toast } from "react-hot-toast";

import { TiTick } from "react-icons/ti";

import { GiCancel } from "react-icons/gi";

import { TbXboxX } from "react-icons/tb";

export default function TableParticipatedStudies(props) {
  const [connectionId, setConnectionId] = useState("");
  const [error, setError] = useState(null);
  const [credential_definition_ids, SetCredential_definition_ids] = useState([])
  const [userRef, SetUserRef] = useState(0)

  React.useEffect(() => {
    axios.get(`http://localhost:8031/credential-definitions/created`)
      .then((res) => { SetCredential_definition_ids(res.data.credential_definition_ids); console.log(res.data.credential_definition_ids); })
      .catch((err) => setError(err));
    axios.get(`http://localhost:3001/backend/patient/displayPatientByref/${props.user_id}`)
      .then((res) => {
        SetUserRef(res.data[0].ref);
      })
      .catch((err) => setError(err));
    axios.get(`http://localhost:8031/connections`)
      .then((res) => { setConnectionId(res.data.results[0].connection_id); })
      .catch((err) => setError(err));
  }, []);



  function getNormalizedDate(timestamp) {
    const dateObject = new Date(timestamp);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month.
    const day = dateObject.getDate();

    // Create a new Date object with only the year, month, and day.
    const normalizedDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    return normalizedDate.toDateString(); // Convert to string using .toDateString()
  }

  const accept = async (study_id, user_id, id, e) => {
    const token = localStorage.getItem('token'); //

    const IssueCred = {
      "connection_id": `${connectionId}`,
      "comment": "Offer on cred def id W1izxRRSiEwMnm27hCRvWs:3:CL:218730:patient.agent.consent_schema",
      "auto_remove": false,
      "credential_preview": {
        "@type": "https://didcomm.org/issue-credential/2.0/credential-preview",
        "attributes": [
          {
            "name": "patient_ref",
            "value": `${userRef}`
          },
          {
            "name": "medical_ref",
            "value": "1111111"
          },
          {
            "name": "consent",
            "value": "True"
          }
        ]
      },
      "filter": {
        "indy": {
          "cred_def_id": `${credential_definition_ids[0]}`
        }
      },
      "trace": false
    }

    // Set the headers with the token
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
      'Content-Type': 'application/json',
    };
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/backend/participants/update/${user_id}/${study_id}/${id}`, {
        state: "accept"
      }, { headers });
      const Request = {
        "ref": userRef,
        "study_id": study_id,
        "connection_id": connectionId,
        "state": "pending",
        "date": "2023-08-07 16:46:51.000"

      }
      await axios.post('http://localhost:3004/backend/request/createRequest', Request)
      const respAgent = await axios.post(`http://localhost:8031/issue-credential-2.0/send-offer`, IssueCred);
      if (respAgent) {
        toast.success("Request accepted successfully");
      }

      // Redirect after a short delay (e.g., 1 second)
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error)
      }
    }
  };

  const refuse = async (study_id, user_id, id, e) => {
    const token = localStorage.getItem('token'); //

    // Set the headers with the token
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
      'Content-Type': 'application/json',
    };
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/backend/participants/update/${user_id}/${study_id}/${id}`, {
        state: "refuse"
      }, { headers });
      toast.success("Request refused successfully");

      // Redirect after a short delay (e.g., 1 second)
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);




    } catch (error) {
      if (error.response) {
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
          <th scope="col" style={{ color: "black" }}>Study ID</th>
          <th scope="col" style={{ color: "black" }}>Relative document</th>
          <th scope="col" style={{ color: "black" }}>State</th>
          <th scope="col" style={{ color: "black" }}>Date</th>

        </tr>
      </thead>
      <tbody>
        {props.participantedstudies.map((participantedstudy) => (
          <tr>
            <td><span style={{ color: "black" }}>{participantedstudy.id}</span></td>
            <td><span style={{ color: "black" }}>{participantedstudy.study_id}</span></td>
            <td><a href={participantedstudy.document} style={{ textDecoration: "none" }}>Click here</a></td>
            <td>            {participantedstudy.state === 'pending' ? (
              <div className="d-flex text-center ml-0 pl-0 icons">
                <a title='accept' href='/' onClick={(e) => accept(participantedstudy.study_id, participantedstudy.user_id, participantedstudy.id, e)}><h3 className="text-center"><TiTick style={{ color: "black" }} /> </h3></a>
                <a title='refuse' href='/' onClick={(e) => refuse(participantedstudy.study_id, participantedstudy.user_id, participantedstudy.id, e)}> <h3 className="text-center"><GiCancel style={{ color: "black" }} /> </h3></a>
              </div>
            ) : participantedstudy.state === 'accept' ? (
              <button type="button" class="btn btn-danger" onClick={(e) => refuse(participantedstudy.study_id, participantedstudy.user_id, participantedstudy.id, e)}>Remove acces</button>
            ) : (
              <h3><TbXboxX style={{ color: "black" }} /> </h3>
            )}</td>
            <td><span style={{ color: "black" }}>{getNormalizedDate(participantedstudy.date)}</span></td>

          </tr>
        ))}
      </tbody>
    </table>
  )
}
