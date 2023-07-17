import React from 'react'
import {

    MdCheckCircleOutline

} from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

import { FcCancel } from "react-icons/fc";
import { TbXboxX } from "react-icons/tb";

import { BiCommentDots, BiLoader } from "react-icons/bi";

import PaginationControls from "./pagination";
import FaEye from "./Viewprofile";
import Card from './Card';
export default function Homepage() {
    return (

        <section className="home mt-3">
            <div class="tab-pane-with-nested-tab fade show active" id="tab1-content" role="tabpanel" aria-labelledby="nav-tab1">
                
                <ul role="tablist" aria-owns="nav-linkA nav-linkB nav-linkC nav-linkD" class="nav nav-tabs nav-tabs-light mt-0">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="nav-linkA" href="#linkA" data-bs-toggle="tab" data-bs-target="#linkA" role="tab" aria-current="page">Patients</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="nav-linkB" href="#linkB" data-bs-toggle="tab" data-bs-target="#linkB" role="tab">My studies</a>
                    </li>
                </ul>
                <div class="tab-content border-0" id="nav-tabs-light-content">
                    <div class="tab-pane fade show active" id="linkA" role="tabpanel" aria-labelledby="nav-linkA">
                        <div className="container ">
                            <div className="row text-center ">
                                <div className=" m-auto">
                                    <h1>20 patients on the list!</h1>
                                </div>


                                <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <caption class="visually-hidden">Boosted tables basic look</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ color: "black" }}>#</th>
                                            <th scope="col" style={{ color: "black" }}>Age</th>
                                            <th scope="col" style={{ color: "black" }}>Date</th>
                                            <th scope="col" style={{ color: "black" }}>Status</th>
                                            <th scope="col" style={{ color: "black" }}>Details</th>
                                            <th scope="col" style={{ color: "black" }}>Commentaires</th>
                                            <th scope="col" style={{ color: "black" }}>send study document</th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span style={{ color: "black" }}>2</span></td>
                                            <td><span style={{ color: "black" }}>52</span></td>
                                            <td><span style={{ color: "black" }}>10-05-2021</span></td>
                                            <td><h3><BiLoader title='pending' /> </h3></td>
                                            <td><h3><FaEye style={{ color: "black" }} /> </h3></td>
                                            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>

                                            <td>    <button type="button" class="btn btn-primary">Send Invitation</button></td>


                                        </tr>
                                        <tr>
                                            <td><span style={{ color: "black" }}>2</span></td>
                                            <td><span style={{ color: "black" }}>43</span></td>
                                            <td><span style={{ color: "black" }}>10-05-2021</span></td>
                                            <td><h3><FcCancel style={{ color: "red" }} /> </h3></td>
                                            <td><h3 style={{ color: "black" }}><FaEye style={{ color: "black" }} /> </h3></td>
                                            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
                                            <td><a href="#"> <h3><FaFileUpload style={{ color: "#172B4D" }} /> </h3></a></td>

                                        </tr>
                                        <tr>
                                            <td><span style={{ color: "black" }}>2</span></td>
                                            <td><span style={{ color: "black" }}>43</span></td>
                                            <td><span style={{ color: "black" }}>10-05-2021</span></td>
                                            <td><h3><MdCheckCircleOutline style={{ color: "green" }} /> </h3></td>
                                            <td><h3 style={{ color: "black" }}><FaEye style={{ color: "black" }} /> </h3></td>
                                            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
                                            <td><a href="#"> <h3><FaFileUpload style={{ color: "#172B4D" }} /> </h3></a></td>

                                        </tr>
                                        <tr>
                                            <td><span style={{ color: "black" }}>2</span></td>
                                            <td><span style={{ color: "black" }}>43</span></td>
                                            <td><span style={{ color: "black" }}>10-05-2021</span></td>
                                            <td><h3><TbXboxX style={{ color: "black" }} /> </h3></td>
                                            <td><h3 style={{ color: "black" }}><FaEye style={{ color: "black" }} /> </h3></td>
                                            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
                                            <td><a href="#"> <h3><FaFileUpload style={{ color: "#172B4D" }} /> </h3></a></td>

                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>43</td>
                                            <td><span style={{ color: "black" }}>10-05-2021</span></td>
                                            <td><h3><TbXboxX style={{ color: "black" }} /> </h3></td>
                                            <td><h3 style={{ color: "black" }}><FaEye style={{ color: "black" }} /> </h3></td>
                                            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
                                            <td><a href="/Sendstudydocument/1"> <h3><FaFileUpload style={{ color: "#172B4D" }} /> </h3></a></td>

                                        </tr>

                                    </tbody>
                                </table>

                                <div>
                                    <PaginationControls
                                        currentPage="1"
                                        totalPages="2"
                                        handlePageChange="2"
                                        handleLimitChange="2"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane" id="linkB" role="tabpanel" aria-labelledby="nav-linkB">
                <div className="row ">

                    <Card/>
                    <Card/>
                    <Card/>
                    
                    <Card/>
                    <Card/>
                    <Card/>
                    
                    <Card/>
                    <Card/>
                    <Card/>
                    </div>
                    
                    
                   
                </div>
                </div>


            </div>
        </section>

    )
}
