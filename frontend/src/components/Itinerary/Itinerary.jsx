import Accordion from "./Accordion";


export default function Itinerary({ item }) {
    return (

        <div className="container card mb-3 col-10 col-sm-12 col-md-8">


            {/* DETAIL BODY */}

            <div className="card-body d-flex flex-md-row flex-column align-items-center">
                <div>
                    <p>{item.userName}</p>
                    <img src={item.userPic} alt={item.userName} className="imgTinerary" />
                </div>


                <div className="container d-flex flex-column justify-content-around flex-wrap gap-3 align-items-center">
                    <h2>{item.title}</h2>
                    <p>Price: {item.price}</p>
                    <p>Duration: {item.duration}</p>
                    <p>🧡 {item.likes}</p>
                    <p>{item.hashtag}</p>
                </div>
            </div>

            <Accordion/>



        </div>

    )
}