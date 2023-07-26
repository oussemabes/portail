import React, { useState, useEffect } from "react";

import FaEye from "./Viewprofile";
import { FaFileUpload } from "react-icons/fa";

import { BiCommentDots, BiLoader } from "react-icons/bi";
export default function Tableusers(props) {
    const [username, SetUsername] = useState([]);
  const Link =(user_id)=>{
    return `http://localhost:3000/Sendstudydocument/${user_id}`
  }
  return (
    <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <caption class="visually-hidden">Boosted tables basic look</caption>
    <thead>
        <tr>
            <th scope="col" style={{ color: "black" }}>#</th>
            <th scope="col" style={{ color: "black" }}>Patient reference</th>
            <th scope="col" style={{ color: "black" }}>Details</th>
            <th scope="col" style={{ color: "black" }}>Commentaires</th>
            <th scope="col" style={{ color: "black" }}>send study document</th>
        </tr>
    </thead>
    <tbody>
        {props.users.map((user) => (
        <tr>
            <td><span style={{ color: "black" }}>{user.id}</span></td>
            <td><span style={{ color: "black" }}>{user.ref}</span></td>
            <td><h3><FaEye style={{ color: "black" }} user_id={user.id} /> </h3></td>
            <td><h3><BiCommentDots style={{ color: "#172B4D" }} /> </h3></td>
            <td>  <a href={Link(user.id)} ><h3> <FaFileUpload style={{color:"black"}}>Send Invitation</FaFileUpload></h3> </a> </td>


        </tr>
))}
    </tbody>
</table>
  )
}
