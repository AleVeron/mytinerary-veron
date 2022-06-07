import "./hero.css";
import imgHero from "../../images/MyTinerary.png"
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="container-fluid hero d-flex flex-column justify-content-center align-items-center">

            <div className="heroItems d-flex flex-column justify-content-around align-items-center">
                <img className="heroIcon" src={imgHero} alt="" />
                <div className="d-flex flex-column justify-content-around align-items-center gap-5">
                    <p className="heroP ms-2 me-2 p-3">Discover your best trip, only here in MyTinerary</p>
                    
                    <Link to={"/cities"}><button className="heroButton">Go to your next travel</button></Link>
                </div>
            </div>

        </div>
    )
}