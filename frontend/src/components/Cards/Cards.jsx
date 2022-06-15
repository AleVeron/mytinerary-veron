import { Link } from "react-router-dom";
import "./cards.css";


const Cards = ({city}) => {
    
    return (

        <>           
            <div key={city.id} className="container card mb-3 col-10 col-sm-12 col-md-5">
              <img src={city.image} className="card-img-top imgCard" alt={city.name}/>
              <div className="card-body d-flex justify-content-around align-items-center">
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