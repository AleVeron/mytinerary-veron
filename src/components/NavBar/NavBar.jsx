import React from "react";
import "./navBar.css";
import {Link} from "react-router-dom"



function NavBar() {

    

    return (
        <>
     
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid ps-4">
                        <a className="navbar-brand" href="#">MyTinerary</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/home"}>HOME</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/cities"}>CITIES</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-5 pe-lg-5">
                                <li className="nav-item dropdown">
                                    <a className="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="logoSign" src="http://cdn.onlinewebfonts.com/svg/img_311846.png" alt="" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropLink dropdown-item text-center text-lg-start" href="#">Sign in</a></li>
                                        <li><a className="dropLink dropdown-item text-center text-lg-start" href="#">Sign Out</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
 
        </>
    )
}

export default NavBar;