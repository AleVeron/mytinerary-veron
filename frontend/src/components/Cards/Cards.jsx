import "./cards.css";
import cities from '../../data/data.js';


const Cards = () => {
    console.log(cities);
    return (

        <>
        
        {cities.map((city)=>(
                <div key={city.id} className="card mb-3 container">
                <img src={city.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{city.name}</h5>
                  <p className="card-text">{city.description}</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
        ))}
        
        </>
        
    )
}

export default Cards;