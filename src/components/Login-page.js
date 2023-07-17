import React from 'react'

export default function Loginpage() {
    return (
        <>
            <section className="home mt-4 mt-3 pt-3 pb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        
              <li class="breadcrumb-item active" aria-current="page">Log In</li>
              
            </ol>
                <div class="row">
                    <div class="col-md-6">
                        <form class="px-4 py-3 mt-6  pt-5 needs-validation" >
                            <div class="mb-3">
                                <label for="validationCustom01" class="form-label is-required">First name</label>
                                <input type="text" class="form-control" id="validationCustom01" placeholder='Email' style={{ width: "75%" }} required />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleDropdownFormPassword1" class="form-label is-required">Password</label>
                                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" style={{ width: "75%" }} required />
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
                            New around here? <a style={{ color: "#FF7A00" }} href="#">  Sign up</a>

                            <button type="submit" class="btn btn-primary mt-2" style={{width:'75%'}}>Sign in</button>
                        </form>
                        <div class="dropdown-divider"></div>
                    </div>
                    <div class="col-md-6 mt-6  pt-5">
                        <img src="Screenshot 2023-07-05 004610.jpg" class="rounded " style={{width:"50%"}} alt="..." />
                    </div>
                </div>
            </section>
        </>
    )
}
