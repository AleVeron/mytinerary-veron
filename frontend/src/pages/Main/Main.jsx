import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Hero from "../../components/Hero/Hero";
import "./main.css";


function Main (){

    


    return(
        <div className="main d-flex flex-column justify-content-between">

        <Hero/>
    
        <Carousel />
       
        </div>
    )
}

export default Main;