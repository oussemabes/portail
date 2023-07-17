import React from 'react'
import { FaEye } from "react-icons/fa";

import { FcViewDetails } from "react-icons/fc";

export default function Viewprofile() {
  return (
    <>
      <FcViewDetails type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" title="Show profile">
      </FcViewDetails>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title h5" id="exampleModalLabel">Ahmed informations</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal"><span class="visually-hidden">Close</span></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="main-body">
                  <div class="row gutters-sm">


                    <div class="col-md">
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Full Name</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              Kenneth Valdez
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              fip@jukmuh.al
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Phone</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              (239) 816-9029
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Chronic disease</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              Grippe
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Mobile</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              (320) 380-4539
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Address</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              Bay Area, San Francisco, CA
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            
                          </div>
                        </div>
                      </div>





                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
