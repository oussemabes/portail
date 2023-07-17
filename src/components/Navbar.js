import React from 'react'

import { BiLogIn } from "react-icons/bi";

export default function Sidebar() {
    return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <div class="navbar-brand me-auto me-lg-4">
      <a class="stretched-link" href="#">
        <img src="/orange_logo.png" width="50" height="50" alt="Boosted - Back to Home" loading="lazy"/>
       

      </a>
      <h3 class="title"> Investigor Center</h3>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse align-items-end" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        

      </ul>

    </div>
    <form class="d-flex navbar-item ms-auto" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-primary btn-inverse" style={{display:"none"}} type="submit">Search</button>
      </form>
    <a title='Log Out' href='/' className='logouticon' style={{color:"white"}}> <h1> <BiLogIn /></h1></a>
  </div>
</nav>
    )
}