import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Cube from './Cube';
import { useDispatch } from "react-redux";
import commentariesActions from "../../redux/actions/commentariesActions";
import itinerariesActions from '../../redux/actions/itinerariesActions';
import Swal from 'sweetalert2';


function BasicExample({ props, comments, propId }) {

  const dispatch = useDispatch()

  const [inputText, setInputText] = useState("")
  const [reload, setReload] = useState(false)
  const [editComment, setEditComment] = useState("")
  
  const maping = props

  let cityId = propId  //Id del useParams para el setReload

  let oneTinerary = comments?.data.response;  //Lo uso para obtener el id del itinerario

  let comentaries = oneTinerary?.comments  //Array de los comentarios que luego uso para mapear
 

  //Modificar comentarios

  async function modifyComment(event) {
    const comment = {
      commentId: event.target.id,
      comment: editComment,
    }
    let change = await dispatch(commentariesActions.modifyComment(comment))
    console.log(change);
    Swal.fire(change.data.message)
  }

  //Eliminar comentario
  async function deleteComment(event) {
    const clear = await dispatch(commentariesActions.deleteComment(event.target.id))
    Swal.fire(clear.data.message)
    setReload(!reload)
  }

  //Subir comentarios
  async function uploadComment() {
    const comment = {
      itineraryId: oneTinerary._id,
      comment: inputText,
    }
    let add = await dispatch(commentariesActions.addComment(comment))  //Despacho a la comentariesActions, el id del itinerario y el comentario del input
    Swal.fire(add.data.message)
    setReload(!reload)
  }

  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesByCity(cityId))
  }, [reload])


  return (
    <Accordion defaultActiveKey="0" >
      <Accordion.Item eventKey="1">
        <Accordion.Header>See more</Accordion.Header>
        <Accordion.Body className='d-flex justify-content-around flex-xxl-row flex-column align-items-center'>


          {/* Si mi array maping (con actividades) llega undefined no imprimo el cubo */}

          {maping !== undefined ? (<div className="cubo">
            <Cube props={props} />
          </div>) : (<h1 >Activities not found</h1>)}


          {maping !== undefined ?

            <div className='container'>
              <div className="card-body text-center">
                <h4 className="card-title mt-5">Latest Comments</h4>
              </div>
              {comentaries?.map((item, index) =>

            

                <div className = "row d-flex justify-content-center mt-100 mb-60" key = { item._id } >
                <div className="col-12 col-sm-10">
                  <div className="card">

                    <div className="comment-widgets">
                      <div className="d-flex flex-row comment-row m-t-0">
                        <div className="p-2"><img src={item?.user.photoUser} alt="user" width="50" className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                          <h6 className="font-medium">{item?.user.fullName.toUpperCase()}</h6>
                          <span  suppressContentEditableWarning={true}
                            contentEditable className="m-b-15 d-block"
                            onInput={(event) => setEditComment(event.currentTarget.textContent)}
                          >{item?.comment}
                          </span>

                          <div className="comment-footer">
                            <span className="float-right p-2">Date: {new Date(item?.date).toUTCString().slice(4, 17)}</span>
                            <button id={item._id} onClick={modifyComment} type="button" className="btn btn-cyan btn-sm m-2">Edit</button>
                            <button id={item._id} onClick={deleteComment} type="button" className="btn btn-danger btn-sm m-2">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

              )}

          <div className="container d-flex justify-content-center align-items-center">
            
            <div className="cardComment p-3">
              <h5>Add comments</h5>
              <textarea id="textarea" className="form-control"
               onInput={(event) => setInputText(event.target.value)}>
              </textarea>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <span id="count"></span> <button type='submit' onClick={uploadComment} className="btn btn-sm btn-dark">Submit</button>
              </div>
            </div>
         
          </div>


        </div>





            : ""}


      </Accordion.Body>
    </Accordion.Item>
    </Accordion >
  );
}

export default BasicExample;