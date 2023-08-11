import '../App.css';
import React from 'react'
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function SignUp(props) {
  const [formValue, setFormValue] = useState({
    ref: "",

  });
  const [error, setError] = useState(null);

  React.useEffect(() => {
    Axios.get(`http://localhost:8021/credential-definitions/created`)
      .then((res) => { SetCredential_definition_ids(res.data.credential_definition_ids); console.log(res.data.credential_definition_ids); })
      .catch((err) => setError(err));
  }, []);
  const [credential_definition_ids, SetCredential_definition_ids] = useState([])
  const { objectString } = useParams();
  const receivedObject = JSON.parse(decodeURIComponent(objectString));

  // Parse the JSON string back to an object
  console.log(receivedObject)
  const Add_New_Patient = async (e) => {

    // Set the headers with the token

    e.preventDefault();
    try {
      const resp = await Axios.post(`http://localhost:3001/backend/patient/register`, {
        ref: formValue.ref,
        connection_id: receivedObject.connection_id
      });
      const respConnection = await Axios.post(`http://localhost:8031/connections/receive-invitation`, receivedObject.invitation);

      if (resp.data && respConnection.data) {

        window.location.href = "/";

      }
    } catch (error) {
      if (error.response.status === 404) {
        console.log("hello")
        toast.error("Please enter a valid reference")
        console.log(error)
      }
      if (error.response.status === 500) {
        const SetSendoffer = {
          "connection_id": receivedObject.connection_id,
          "comment": "Offer on cred def id GtLBw5FvnrTAYwgTd7B5ag:3:CL:218699:centerInv.agent.patient_schema",
          "auto_remove": false,
          "credential_preview": {
            "@type": "https://didcomm.org/issue-credential/2.0/credential-preview",
            "attributes": [
              {
                "name": "ref",
                "value": `123`
              },
              {
                "name": "disease",
                "value": "N/a"
              },
              {
                "name": "gender",
                "value": "n/a"
              },
              {
                "name": "date",
                "value": "n/a"
              }

            ]
          },
          "filter": {
            "indy": {
              "cred_def_id": credential_definition_ids[0]
            }
          },
          "trace": false
        }
        const respConnection = await Axios.post(`http://localhost:8031/connections/receive-invitation`, receivedObject.invitation);

        const changeConnection = await Axios.patch(`http://localhost:3001/backend/user/changePassword`, {

          "newPassword": `${receivedObject.connection_id}`,
          "userRef": `${formValue.ref}`

        });

        if (changeConnection.data && respConnection.data) {
          const respagent = await Axios.post(`http://localhost:8021/issue-credential-2.0/send-offer`, SetSendoffer);
          if (respagent.data){
            toast.success("Now you can login succefuly")

          }


        }
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
