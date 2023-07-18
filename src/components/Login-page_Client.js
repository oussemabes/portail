import React from 'react'

export default function Loginpage_client() {
    return (
        <>
            <section className="home mt-4 mt-3 pt-3 ">
            <ol class="breadcrumb ml-4 pl-4">
              <li class="breadcrumb-item "><a href="\">Home</a></li>
        
              <li class="breadcrumb-item active" aria-current="page">Log In</li>
              
            </ol>
                <div class="row">
                    <div class="col-md-6 ml-4">
                        <form class="px-4 py-3    needs-validation" >
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

                            <button type="submit" class="btn btn-primary mt-2" style={{width:'75%'}}>Sign in</button>
                        </form>
                        <div class="dropdown-divider"></div>
                    </div>
                    <div class="col-md-6 " style={{textAlign:"center"}}>
                        <span className='align-middle mb-3 pb-3'>If you dont have an account please scan this <strong>QR code</strong></span>
                        <img src="Qrcode_wikipedia_fr_v2clean.png" class="rounded " style={{width:"50%",height:"80%"}} alt="..." className='mt-2'/>
                    </div>
                </div>
            </section>
        </>
    )
}
