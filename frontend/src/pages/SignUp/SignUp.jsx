import './signUp.css'
import { useDispatch } from 'react-redux'
import usersActions from '../../redux/actions/usersActions'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import GoogleSignUp from '../../components/GoogleSignUp/GoogleSignUp'
import { Link } from "react-router-dom"



function SignUp() {


    //Llamado a la api de paises para el select

    const [country, setCountry] = useState([])

    useEffect(() => {
        axios.get(`https://restcountries.com/v2/all?fields=name`)
            .then(response => {
                const apiResponse = response?.data;
                setCountry(apiResponse);
            }).catch(error => {
                console.log(error);
            });
    }, []);


    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        //Prevengo el comportamiento x default del formulario
        event.preventDefault()

        //Creo el archivo requerido en el controlador con los values de mi form
        const userData = {
            fullName: event.target[0].value,
            country: event.target[1].value,
            photoUser: event.target[2].value,
            email: event.target[3].value,
            password: event.target[4].value,
            from: "form-Signup"
        }


        //Despacho esta informacion (userData) hacia mi action para pasarselo a mi controlador y tambien usar sus mensajes
        let res = await dispatch(usersActions.signUpUsers(userData))

       

        //Declaro el mensaje del validator con la res de mi userActions.signUpUsers
        let messageValidator = res.data.message;
    

        if (res.data.from === "validator") {
            messageValidator.forEach(e => {

                toast.error(e.message)
            })
        }
        else {
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }
    }

    return (



        <div className='signIn d-flex flex-column justify-content-center'>


            <form onSubmit={handleSubmit} className="signUpform d-flex flex-column align-items-center container col-10 mt-2 col-md-6 col-xl-4 pt-4 pb-4">

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                    <input required type="text" className="form-control" id="exampleInputFullName" />
                </div>

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputFullName" className="form-label">Country</label>
                    <select className='container' name="country" id="country">
                        {country.map((country, index) => (
                            <option key={index} >
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputPhoto" className="form-label">PhotoUser URL</label>
                    <input type="text" className="form-control" id="exampleInputPhoto" />
                </div>

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3 col-8">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>


                <button type="submit" className="btnF">Submit</button>

                <div className='d-flex flex-column justify-content-center'>
                <h4 className='text-light'>Already have an account?</h4>
                <Link className="dropdown-item text-center text-light" to={"/signIn"}>Sign in</Link>
            </div>

            </form>

            <div className='d-flex justify-content-center p-3 '>
                <GoogleSignUp />
            </div>


        </div>
    )
}

export default SignUp;