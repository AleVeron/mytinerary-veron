import { useParams } from "react-router-dom"
import CardDetail from "../../components/CardDetail/CardDetail"
import cities from "../../data/data"
import "./detail.css";


export default function Detail(){
    const {id} = useParams()
    return(
        <div className="detail">
            <CardDetail key={cities.id} city={cities.filter(city => city.id == Number(id))}/>
        </div>
        
    )
}

