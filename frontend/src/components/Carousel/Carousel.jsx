// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./carousel.css";

// import required modules
import { Grid, Pagination, Autoplay , Navigation } from "swiper";



export default function Carousel() {

  const [city, setCity] = useState()

  useEffect(() => {
    axios.get("http://localhost:4000/api/cities")
    .then(response => setCity(response.data.response.cities))
  }, [])
  
  
  let title = "Popular MyTineraries"
 

  return (
   
   <>  
      <h1 className="p-3 carouselTitle">{title}</h1>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={20}
        slidesPerGroup={2}
        autoplay={{
          delay:3000,
          disableOnInteraction:false
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Grid, Pagination, Navigation]}
        className="mySwiper"

        
      >
        {/* Realizo el mapeo de la variable city */}
        {city?.map((city)=>(
          <SwiperSlide  key={city._id} style={{backgroundImage:`url("${city.image}")`,
          backgroundSize: "cover", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>

            <h3 className="cityTitle fs-4">{city.name}</h3>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}