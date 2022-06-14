import { Link } from "react-router-dom";
import "./cards.css";


const Cards = ({city}) => {
  
    
    return (

        <>           
            <div key={city.id} className="container card mb-3 col-11 col-sm-12 col-md-5">
              <img src={city.image} className="card-img-top" alt={city.name}/>
              <div className="card-body">
                  <h5 className="card-title">{city.name}</h5>
                  <p className="card-text">{city.description}</p>
                  <Link key={city.id} to={`/city/${city.id}`}>
                    <button>HOLA</button>
                    </Link>
              </div>
              </div>  
        </>
        
    )
}

export default Cards;