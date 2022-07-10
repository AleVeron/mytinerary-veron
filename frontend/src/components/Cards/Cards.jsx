import { Link } from "react-router-dom";
import "./cards.css";
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react";


const Cards = ({ city }) => {

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, [])

  return (

    <>
      <div key={city.id} className="container card mb-3 col-10 col-sm-12 col-md-5 col-xl-3 rounded-5" data-aos="fade-up"
        data-aos-anchor-placement="top-bottom" style={{
          backgroundImage: `url("${city.image}")`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
        }}>
        <div className="card-img-top imgCard" alt={city.name} />
        <div className="card-body d-flex justify-content-around align-items-center cardB rounded-5">
          <div className="d-flex flex-column">
            <h5 className="card-title">{city.name}</h5>
            <h6>{city.country}</h6>
          </div>
          <Link key={city.id} to={`/city/${city._id}`}>
            <button className="btnF">Detail</button>
          </Link>
        </div>
      </div>
    </>

  )
}

export default Cards;