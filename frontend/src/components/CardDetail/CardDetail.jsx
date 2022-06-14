
function CardDetail ({city}){
    console.log(city);
    let cities = city[0]

    return(
        <>           
        <div key={cities.id} className="container card mb-3 col-11 col-sm-12 col-md-8">
          <img src={cities.image} className="card-img-top" alt={cities.name}/>
          <div className="card-body">
              <h5 className="card-title">{cities.name}</h5>
              <p className="card-text">{cities.description}</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
          </div>  
    </>
    )
}

export default CardDetail