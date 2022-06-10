import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Hero from "../../components/Hero/Hero";
import "./main.css";
import cities from '../../data/data.js';


function Main (){

    console.log(cities);


    return(
        <div className="main d-flex flex-column justify-content-between">

        <Hero/>
    
        <Carousel  dataCities={cities}/>
       
        </div>
    )
}

export default Main;