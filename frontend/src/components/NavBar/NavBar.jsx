import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../../redux/actions/usersActions";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


function NavBar() {


    const logIn = useSelector(store => store.userReducer.user)

    const dispatch = useDispatch()


    return (
        <>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid ps-md-4">
                    <Link className="navbar-brand" to={"/home"}>MyTinerary</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={"/home"}>HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to={"/cities"}>CITIES</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-lg-0 me-lg-5 pe-lg-5">
                            <li className="nav-item dropdown">
                                <a className="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {logIn?.success ? <img referrerPolicy="no-referrer" className="logoSign" src={logIn?.user.photoUser} alt={logIn?.user.fullName} /> :
                                        <img className="logoSign" src="http://cdn.onlinewebfonts.com/svg/img_311846.png" alt="icon" />}
                                </a>
                                {logIn?.success ? <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <Link onClick={() => {
                                        /* toast(`Good bye ${logIn.user.fullName} 😥😥`) */
                                        let timerInterval
                                        Swal.fire({
                                            title: (`Good bye ${logIn.user.fullName} 😥😥`),
                                            timer: 1500,
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
                                        dispatch(usersActions.signOut())
                                    }}
                                        className="dropLink dropdown-item text-center text-lg-start" to={"/"}>LogOut</Link>

                                </ul> :


                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {/* {toast.success("Thanks for your visit")} */}
                                        <Link className="dropLink dropdown-item text-center text-lg-start" to={"/signUp"}>Sign up</Link>
                                        <Link className="dropLink dropdown-item text-center text-lg-start" to={"/signIn"}>Sign in</Link>
                                    </ul>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavBar;