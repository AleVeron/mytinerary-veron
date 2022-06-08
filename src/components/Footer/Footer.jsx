import React from "react";
import "./footer.css";
import imgHero from "../../images/MyTinerary.png"
import { Link } from "react-router-dom";

const Footer = () => {

    let title = "MyTinerary"

    return (
        <div className="container-fluid footer d-flex justify-content-around align-items-center">

            <ul className="navbar-nav">
                <li className="nav-item m-1">
                <Link className="footerLink nav-link active btnF" to={"/home"}>HOME</Link>
                </li>
                <li className="nav-item m-1">
                <Link className="footerLink nav-link active btnF" to={"/cities"}>CITIES</Link>
                </li>
            </ul>

            <h1>{title}</h1>

            <img className="footerIcon" src={imgHero} alt="" />
            
        </div>

    )
}

export default Footer;