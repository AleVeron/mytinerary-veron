// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./itinerary.css";

// import required modules
import { EffectCube, Autoplay } from "swiper";

export default function Cube({ props }) {

  const activities = props;

  return (

    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        
        modules={[EffectCube, Autoplay]}
        className="myCube mt-100 ms-lg-3 "
      >


        {/* Realizo el mapeo de mis actividades */}
        {activities?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url("${item.img}")`,
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
              }} className="imgCubo d-flex align-items-end justify-content-center"
            >
              <p className="cubeTitle col-10">{item.title}</p>
            </div>
          </SwiperSlide>
        )
        )}

      </Swiper>
    </>
  );
}