import React from 'react'

export default function Sendstudydocument() {
    return (
        <>

            <section className="home mt-4 mt-3 pt-3 pb-3" style={{height:"450px"}}>
                
            <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        
              <li class="breadcrumb-item active" aria-current="page">Send study document</li>
              
            </ol>
          </nav>
                <div class="row">
                    <div class="col-md-6">
                        <div className="  py-3 ms-auto px-3">

                            <h1>Send study document</h1>
                        </div>

                        <form class="px-4 py-3 needs-validation" >
                            <div className=' mb-3 '>
                                <div class="mb-3 row pl-5 pr-5'">
                                    <label for="staticEmail" class="col-sm-2 col-form-label pl-4 pr-4 ml-2">Ref</label>
                                    <div class="col-sm-10">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="25412" />
                                    </div>
                                </div>
                                <div class="mb-3 row ">
                                    <label for="formFile" class="form-label">Select study document</label>
                                    <input class="form-control " type="file" id="formFile" style={{ width: "50%" }} />
                                </div>

                            </div>
                            <button type="submit" class="btn btn-primary" style={{ width: '50%' }}>Send</button>
                        </form>
                        <div class="dropdown-divider"></div>
                    </div>
                    <div class="col-md-6 mt-6  pt-5">
                    </div>
                </div>
            </section>
        </>

    )
}
