import { useParams } from "react-router-dom"
import "./detail.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Detail() {

    const { id } = useParams()

    const [city, setCity] = useState()

     useEffect(()=>{
        axios.get("http://localhost:4000/api/cities")
        .then(response => setCity(response.data.response.cities))
    }, []) 
 

   let filtersDetail = city?.find((c) => {
    return c._id === id
   })

    return (
        
        <div className="detail p-2">
            <div key={filtersDetail?.id} className="container card mb-3 col-11 col-sm-12 col-md-8">
                <img src={filtersDetail?.image} className="card-img-top" alt={filtersDetail?.name} />
                <div className="card-body">
                    <h5 className="card-title">{filtersDetail?.name}</h5>
                    <p className="card-text">{filtersDetail?.description}</p>
                    <Link className="nav-link active btnF" to={"/cities"}>Go back</Link>
                </div>
            </div>
        </div>

    )
}

