import React from "react";

import {

    MdCheckCircleOutline

} from "react-icons/md";
import axios from "axios"

import { TiTick } from "react-icons/ti";

import { GiCancel } from "react-icons/gi";

import { TbXboxX } from "react-icons/tb";

export default function TableParticipatedStudies(props) {
  
    function getNormalizedDate(timestamp) {
        const dateObject = new Date(timestamp);
      
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month.
        const day = dateObject.getDate();
      
        // Create a new Date object with only the year, month, and day.
        const normalizedDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      
        return normalizedDate.toDateString(); // Convert to string using .toDateString()
      }

    const accept = async (study_id,user_id,id,e) => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        e.preventDefault();
        try {
          await axios.patch(`http://localhost:3001/backend/participants/update/${user_id}/${study_id}/${id}`, {
            state:"accept"
          },{headers});
          window.location.href="/"
        } catch (error) {
          if (error.response) {
            console.log(error)
          }
        }
      };

      const refuse = async (study_id,user_id,id,e) => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };
        e.preventDefault();
        try {
          await axios.patch(`http://localhost:3001/backend/participants/update/${user_id}/${study_id}/${id}`, {
            state:"refuse"
          },{headers});
          window.location.href="/"

          
    
         
        } catch (error) {
          if (error.response) {
            console.log(error)
          }
        }
      };
    
  return (
    <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <caption class="visually-hidden">Boosted tables basic look</caption>
    <thead>
        <tr>
            <th scope="col" style={{ color: "black" }}>#</th>
            <th scope="col" style={{ color: "black" }}>Study ID</th>
            <th scope="col" style={{ color: "black" }}>Relative document</th>
            <th scope="col" style={{ color: "black" }}>State</th>
            <th scope="col" style={{ color: "black" }}>Date</th>

        </tr>
    </thead>
    <tbody>
        {props.participantedstudies.map((participantedstudy) => (
        <tr>
            <td><span style={{ color: "black" }}>{participantedstudy.id}</span></td>
            <td><span style={{ color: "black" }}>{participantedstudy.study_id}</span></td>
            <td><a href={participantedstudy.document} >click here</a></td>
            <td>            {participantedstudy.state === 'pending' ? (
                <div className="d-flex text-center ml-0 pl-0 icons">
                            <a title='accept' href='/'  onClick={(e) => accept(participantedstudy.study_id, participantedstudy.user_id,participantedstudy.id, e)}><h3 className="text-center"><TiTick style={{ color: "black" }} /> </h3></a>
                           <a title='refuse' href='/' onClick={(e) => refuse(participantedstudy.study_id, participantedstudy.user_id,participantedstudy.id, e)}> <h3 className="text-center"><GiCancel style={{ color: "black" }} /> </h3></a>
                            </div>
                        ) : participantedstudy.state === 'accept' ? (
                              <button type="button" class="btn btn-danger" onClick={(e) => refuse(participantedstudy.study_id, participantedstudy.user_id,participantedstudy.id, e)}>Remove acces</button>
                        ) : (
                            <h3><TbXboxX style={{ color: "black" }} /> </h3>
                        )}</td>
            <td><span style={{ color: "black" }}>{getNormalizedDate(participantedstudy.date)}</span></td>

        </tr>
))}
    </tbody>
</table>
  )
}
