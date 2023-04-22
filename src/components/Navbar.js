import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar(props) {
  let history = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token');
    props.showAlert("logout successfully","success")
    history("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          YourNote
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${window.location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${window.location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /></form> */}
          {localStorage.getItem('token')?<><Link className="btn btn-primary mx-2" onClick={handleLogout} role="button">
            Log out
          </Link></>:<><Link className="btn btn-primary mx-2" to="/login" role="button">
            Login
          </Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">
            Sign up
          </Link></>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
