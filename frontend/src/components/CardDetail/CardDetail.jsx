
function CardDetail ({city}){
    console.log(city);
    let citis = city[0]

    return(
        <>           
        <div key={citis.id} className="container card mb-3 col-11 col-sm-12 col-md-5">
          <img src={citis.image} className="card-img-top" alt={citis.name}/>
          <div className="card-body">
              <h5 className="card-title">{citis.name}</h5>
              <p className="card-text">{citis.description}</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
          </div>  
    </>
    )
}

export default CardDetail