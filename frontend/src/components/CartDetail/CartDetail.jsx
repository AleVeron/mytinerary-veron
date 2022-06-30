

const CartDetail = ({item}) => {

    console.log(item);

    return (


        <div key={item._id} className="container card mb-3 col-10 col-sm-12 col-md-8">



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



            <div className="accordion" id="accordionExample">

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            View more
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>Futures activities</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CartDetail;