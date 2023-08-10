

import React, { useState, useEffect } from "react";
import axios from "axios"
import PaginationControls from "./pagination";
import TableParticipatedStudies from "./table-participated-studies";
import jwtDecode from "jwt-decode";
export default function Homepage(props) {
    const [totalPagesStudies, setTotalPagesStudies] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countStudies, setCountStudies] = useState(0);
    const [countacceptedStudies, setCountAcceptedStudies] = useState(0);

    const [error, setError] = useState(null);
    const [participatedStudies, setParticipatedStudies] = useState([]);

    const [userId, setUserId] = React.useState(0);

    function sortArrayByDateDescending(arr) {
        return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    const token = localStorage.getItem('token'); //
    const user = jwtDecode(token);


    useEffect(() => {
   
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios.get(`http://localhost:3001/backend/participants/countbystudies/${user.id}`, { headers })
            .then((res) => { setCountStudies(res.data); setTotalPagesStudies(Math.ceil(res.data[0].count / limit)); setCountStudies(Math.ceil(res.data[0].count)); console.log(Math.ceil(res.data[0].count / limit)) })
            .catch((err) => setError(err));
        axios.get(`http://localhost:3001/backend/participants/countbyacceptedstudies/${user.id}`, { headers })
            .then((res) => { setCountAcceptedStudies(Math.ceil(res.data[0].count)) })
            .catch((err) => setError(err));






    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token'); //
        const user = jwtDecode(token);
        setUserId(user.id)
        console.log(user.id)
        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        axios
            .get(
                `http://localhost:3001/backend/participants/display/${user.id}?page=${currentPage}&limit=${limit}`
                , { headers })
            .then((res) => { setParticipatedStudies(sortArrayByDateDescending(res.data)); console.log(res.data) })
            .catch((err) => setError(err));
    }, [currentPage, limit]);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    return (

        <section className="home mt-3">
            <div class="tab-pane-with-nested-tab fade show active" id="tab1-content" role="tabpanel" aria-labelledby="nav-tab1">

                <ul role="tablist" aria-owns="nav-linkA nav-linkB nav-linkC nav-linkD" class="nav nav-tabs nav-tabs-light mt-0">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="nav-linkA" href="#linkA" data-bs-toggle="tab" data-bs-target="#linkA" role="tab" aria-current="page">Studies</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="nav-linkB" href="#linkB" data-bs-toggle="tab" data-bs-target="#linkB" role="tab">Invitations</a>
                    </li>
                </ul>

                <div class="tab-content border-0" id="nav-tabs-light-content">
                    <div class="tab-pane fade show active" id="linkA" role="tabpanel" aria-labelledby="nav-linkA">
                        <div className="container ">
                            <div className="row text-center" >
                                <div className=" m-auto title">
                                    <h1>You are participating in {countacceptedStudies} studies!</h1>
                                </div>

                                <TableParticipatedStudies participantedstudies={participatedStudies} user_id={user.id} />


                                <div>
                                    <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={totalPagesStudies}
                                        handlePageChange={handlePageChange}
                                        handleLimitChange={handleLimitChange}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane text-center " id="linkB" role="tabpanel" aria-labelledby="nav-linkB">
                        <div className="title">
                            <h1>studies on the list!</h1>
                            <button type="button" class="btn btn-primary" >Create new one</button>
                        </div>
                        <div className="row ">




                        </div>
                    </div>

                </div>
            </div>

        </section>

    )
}
