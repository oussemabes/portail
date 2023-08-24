

import React, { useState, useEffect } from "react";
import axios from "axios"
import PaginationControls from "./pagination";
import Card from './Card';
import Tableusers from "./Table-patient";
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countusers, setCountusers] = useState(0);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [studies, setStudies] = useState([]);
    const [totalPagesStudies, setTotalPagesStudies] = useState(0);
    const [currentPageStudies, setCurrentPageStudies] = useState(1);
    const [limitStudies, setLimitStudies] = useState(6);
    const [countstudies, setCountstudies] = useState(0);
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [countPatients, setCountPatients] = useState([]);

    const handleButtonClick = () => {
        // Navigates to "/create" when the button is clicked
        navigate('/create');
    };


    useEffect(() => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios.get(`http://localhost:3001/backend/user/countUsers`, { headers })
            .then((res) => { setCountusers(res.data[0].count);; setCountusers(Math.ceil(res.data[0].count)); console.log(res.data) })
            .catch((err) => setError(err));
        axios.get(`http://localhost:3001/backend/patient/count`)
            .then((res) => {
                setCountPatients(res.data[0].count);
                if (res.data[0].count === 0) {
                    setTotalPages(Math.ceil((res.data[0].count + countusers) / limit));
                }
                else {
                    setTotalPages(Math.ceil((res.data[0].count + countusers) / limit) + 1);
                }
            })
            .catch((err) => setError(err));
        axios.get(`http://localhost:3001/backend/studies/count`, { headers })
            .then((res) => { setCountstudies(res.data); setTotalPagesStudies(Math.ceil(res.data[0].count / limitStudies)); setCountstudies(Math.ceil(res.data[0].count)) })
            .catch((err) => setError(err));
    }, [limit, totalPages, limitStudies, totalPagesStudies]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios.get(`http://localhost:3001/backend/user/countUsers`, { headers })
            .then((res) => {
                const count = Math.ceil(res.data[0].count);
                setCountusers(count);
                if (currentPage <= Math.ceil(count / limit)) {
                    setPatients([])
                    axios.get(`http://localhost:3001/backend/user/display?page=${currentPage}&limit=${limit}`, { headers })
                        .then((res) => { setUsers(res.data); console.log(res.data) })
                        .catch((err) => setError(err));
                }
                if (currentPage === Math.ceil(count / limit)) {
                    axios.get(`http://localhost:3001/backend/user/display?page=${currentPage}&limit=${limit}`, { headers })
                        .then((res) => { setUsers(res.data); console.log(res.data) })
                        .catch((err) => setError(err));
                    
                }

                axios.get(`http://localhost:3001/backend/studies/display?page=${currentPageStudies}&limit=${limitStudies}`, { headers })
                    .then((res) => { setStudies(res.data); console.log(res.data) })
                    .catch((err) => setError(err));

                if (currentPage > Math.ceil(count / limit)) {
                    setUsers([])
                    console.log(`http://localhost:3001/backend/patient/displayPatient?page=${currentPage - Math.ceil(count / limit)}&limit=${limit}`)
                    axios.get(`http://localhost:3001/backend/patient/displayPatient?page=${currentPage - Math.ceil(count / limit)}&limit=${limit}`, { headers })
                        .then((res) => { setPatients(res.data) })
                        .catch((err) => setError(err));
                }
            })
            .catch((err) => setError(err));
    }, [currentPage, limit, currentPageStudies, limitStudies]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handlePageChangeStudies = (newPage) => {
        setCurrentPageStudies(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };
    const handleLimitChangestudies = (newLimit) => {
        setLimitStudies(newLimit);
        setCurrentPageStudies(1);
    };

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
                            <div className="row text-center" >
                                <div className=" m-auto title">
                                    <h1>{countusers} patients on the list!</h1>

                                </div>

                                <Tableusers users={users} patients={patients} />


                                <div>
                                    <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={2}
                                        handlePageChange={handlePageChange}
                                        handleLimitChange={handleLimitChange}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane text-center " id="linkB" role="tabpanel" aria-labelledby="nav-linkB">
                        <div className="title" style={{ textAlign: "right" }}>
                            <button type="button" class="btn btn-primary" style={{ marginLeft: "auto" }} onClick={handleButtonClick}>Create new study</button>
                        </div>
                        <div className="row ">
                            {studies.map((study) => (
                                <Card
                                    id={study.id}
                                    name={study.name}
                                    disease={study.disease}
                                    discreption={study.discreption}

                                />
                            ))}
                        </div>

                        <PaginationControls
                            currentPage={currentPageStudies}
                            totalPages={totalPagesStudies}
                            handlePageChange={handlePageChangeStudies}
                            handleLimitChange={handleLimitChangestudies}
                        />



                    </div>
                </div>


            </div>
        </section>

    )
}
