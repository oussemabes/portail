import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";
import QRCode from 'qrcode.react';

export default function Loginpage() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://localhost:3001/backend/user/logiN`, {
        email: formValue.email,
        password: formValue.password,
      });

      if (resp.data) {
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
  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);
  const url = "http://18.197.128.8/"
  const qrCodeSize = 300; // Set the desired size of the QR code in pixels

  return (
    <>
      <section className="home mt-4 mt-3 pt-3 pb-3">
        <ol class="breadcrumb ml-4 pl-4">
          <li class="breadcrumb-item "><a href="\">Home</a></li>

          <li class="breadcrumb-item active" aria-current="page">Log In</li>

        </ol>
        <div class="row">
          <div class="col-md-6 ml-4">
            <form class="px-4 py-3 mt-6  pt-5 needs-validation" >
              <div class="mb-3">
                <label for="validationCustom01" class="form-label is-required">Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="validationCustom01"
                  placeholder='Email'
                  style={{ width: "75%" }}
                  value={formValue.email}
                  onChange={onChange}
                  required />
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label is-required">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={formValue.password}
                  class="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                  style={{ width: "75%" }}
                  required />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                  <label class="form-check-label" for="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <a class="dropdown-item" href="#">Forgot password?</a>

              <button type="submit"
                class="btn btn-primary mt-2"
                style={{ width: '75%' }}
                onClick={LoginUser}>Sign in</button>
            </form>
            <div class="dropdown-divider"></div>
          </div>
          <div className="col-md-6" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h5 className='align-middle mb-3 pb-3'>If you don't have an account, please scan this <u>QR code</u></h5>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <QRCode value={url} size={qrCodeSize} />
            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}
