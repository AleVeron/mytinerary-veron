import './signIn.css'
import { useDispatch } from 'react-redux'
import usersActions from '../../redux/actions/usersActions'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn'
import Swal from 'sweetalert2';

function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {

        //Prevengo el comportamiento x default del formulario
        event.preventDefault()

        //Creo el archivo requerido en el controlador con los values de mi form
        const userSignIn = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: "form-SignIn"
        }



        //Despacho esta informacion (userData) hacia mi action y espero su return para utilizarlo
        let res = await dispatch(usersActions.loginUsers(userSignIn))
       /*  console.log(res); */

        //Funcion para la alerta
        if (res.data.success) {

            let timerInterval
            Swal.fire({
                title: (res.data.message),
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
            /* toast.success(res.data.message) */
            navigate('/')
        } else {
            toast.error(res.data.message)
        }
    }



    return (
        <div className='signIn d-flex flex-column justify-content-center'>

            <form onSubmit={handleSubmit} className="logIn container d-flex flex-column align-items-center col-10 mt-2 col-md-6 col-xl-6 pt-4 pb-4">

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputEmail" className="form-label">Email </label>
                    <input name='email' type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name='password' type="password" className="form-control" id="exampleInputPassword1" />
                </div>


                <div className='d-flex align-items-center justify-content-around flex-column col-8'>

                    <button type="submit" className="btnF col-6">Log In</button>

                    <div className='d-flex justify-content-center p-3 '>
                        <GoogleSignIn />
                    </div>


                </div>
            </form>

            <div className='d-flex flex-column justify-content-center logIn col-10 col-md-6 col-xl-6 container pb-3'>
                <h4>Don't have an account yet?</h4>
                <Link className="dropdown-item text-center signLink text-light" to={"/signUp"}>Sign up</Link>
            </div>


        </div>
    )
}

export default SignIn;