import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";
import QRCode from 'qrcode.react';

export default function Loginpage() {
  const [formValue, setFormValue] = useState({
    reference: "",
    password: "",
  });
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Axios.post(`http://localhost:8021/connections/create-invitation`, BodyGetUrl)
    .then((res) => { setUrl(res.data.invitation_url);console.log(res.data.invitation_url); setConnectionInformation((JSON.stringify(res.data)));console.log(JSON.stringify(res.data))})
    .catch((err) => setError(err));
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);
  const [url,setUrl]=useState("")
  const [error, setError] = useState(null);
  const [connectionInformation,setConnectionInformation]=useState({})

  const BodyGetUrl={
    "recipientKeys": ["did:key:z6MkgrdWJQ1YtZLf4MPYzf5XJXtuoBBXvaG9d6n9iyybYBuR"],
    "serviceEndpoint": "http://host.docker.internal:8020"
  }
  
  const LoginUser = async (e) => {
    const ProofRequest=
  {
     "presentation_request":{
        "indy":{
           "name":"Proof of The patient",
           "version":"1.0",
           "requested_attributes":{
              "0_ref_uuid":{
                 "name":"ref",
                 "restrictions":[
                    {
                       "schema_name":"patient schema"
                    }
                 ]
              },
              "0_gender_uuid":{
                 "name":"gender",
                 "restrictions":[
                    {
                       "schema_name":"patient schema"
                    }
                 ]
              },
              "0_disease_uuid":{
                 "name":"disease",
                 "restrictions":[
                    {
                       "schema_name":"patient schema"
                    }
                 ]
              },
              "0_date_uuid":{
                 "name":"date",
                 "restrictions":[
                    {
                       "schema_name":"patient schema"
                    }
                 ]
              }
           },
           "requested_predicates":{
              "0_ref_GE_uuid":{
                 "name":"ref",
                 "p_type":">",
                 "p_value":1,
                 "restrictions":[
                    {
                       "schema_name":"patient schema"
                    }
                 ]
              }
           }
        }
     },
     "trace":false,
     "connection_id":`${formValue.password}`
  }
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://localhost:3001/backend/user/logiN`, {
        email: `${formValue.reference}@portail.com`,
        password: formValue.password,
      });
      const respAgent = await Axios.post(`http://localhost:8021/present-proof-2.0/send-request`, ProofRequest);
     

      if (resp.data && respAgent.data) {
        localStorage.setItem("token", resp.data);
        setisLoggedIn(true);
        toast.success("Welcome back :)", {
          position: "bottom-center",
          duration: 5000,
        });
      }
      
    
  
    } catch (error) {
      if (error.response) {
        console.log(error)
        toast.error("Please enter a valid Email/Password");
      }
    }
  };
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };


  const qrCodeSize = 300; // Set the desired size of the QR code in pixels

  return (
    <> 
      <section className="home mt-4 mt-3 pt-3 pb-3">
        <ol class="breadcrumb ml-4 pl-4">
          <li class="breadcrumb-item "><a href="\">Home</a></li>

          <li class="breadcrumb-item active" aria-current="page">Proof Request</li>

        </ol>
        <div class="row">
          <div class="col-md-6 ml-4">
            <form class="px-4 py-3 mt-6  pt-5 needs-validation" >
              <div class="mb-3">
                <label for="validationCustom01" class="form-label is-required">Reference</label>
                <input
                  type="number"
                  name="reference"
                  class="form-control"
                  id="validationCustom01"
                  placeholder='reference'
                  style={{ width: "75%" }}
                  value={formValue.reference}
                  onChange={onChange}
                  required />
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                  <label class="form-check-label" for="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>

              <button type="submit"
                class="btn btn-primary mt-2"
                style={{ width: '75%' }}
                onClick={LoginUser}>Send Proof Request</button>
            </form>
            <div class="dropdown-divider"></div>
          </div>
          <div className="col-md-6" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h5 className='align-middle mb-3 pb-3'>If you don't have an account, please scan this <u>QR code</u></h5>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <QRCode value={url} size={qrCodeSize} />
              <a href={`/signup/${encodeURIComponent(connectionInformation)}`}>Same action as qr code</a>

            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}
