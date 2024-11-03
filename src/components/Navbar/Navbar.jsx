import React from 'react'
import { Link } from 'react-router-dom'
import NavbarCss from "./Nav.module.css"
export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <Link  className={ NavbarCss.logoStyle  + " navbar-brand"} to="">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tv">TvShow</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Network</Link>
        </li>
      </ul>
      <div className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
      <ul className="navbar-nav mb-2 mb-lg-0">
        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
        <li className="nav-item ">
        <Link to=""><i className="fa-brands fa-facebook"></i></Link>
        <Link to=""><i className="fa-brands fa-spotify"></i></Link>
        <Link to=""><i className="fa-brands fa-instagram"></i></Link>
        <Link to=""><i className="fa-brands fa-youtube"></i></Link>
        </li>
        </ul>
        <li className="nav-item ">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav> 
  
  </>
}
