/* import React, { useRef, useState } from "react"; */

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./carousel.css";

// import required modules
import { Grid, Pagination, Autoplay } from "swiper";


export default function Carousel(props) {
  console.log(props)
  let title = "Popular MyTineraries"
  const cities = props.dataCities;
  console.log(cities);
  return (
   
   <>  
      <h1 className="p-3 carouselTitle">{title}</h1>
      <Swiper
      
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={10}
        slidesPerGroup={2}
        autoplay={{
          delay:3000,
          disableOnInteraction:false
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Grid, Pagination]}
        className="mySwiper"

        
      >
        {/* Realizo el mapeo de la variable city */}
        {cities.map((city)=>(
          <SwiperSlide key={city.id} style={{backgroundImage:`url("${city.image}")`,
          backgroundSize: "cover", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>

            <h3 className="cityTitle">{city.name}</h3>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}