import './styles/App.css';
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Error from './pages/Error/Error';
import Cities from './pages/Cities/Cities';
import ScrollToTop from "react-scroll-to-top"
import Detail from './pages/Detail/Detail';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import citiesActions from './redux/actions/citiesActions';
import { useDispatch } from 'react-redux';
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import usersActions from './redux/actions/usersActions';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(citiesActions.getCities())

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')
      dispatch(usersActions.verifyToken(token))
    }

  }, [])

  return (

    <div className='App'>
      <>
        <ToastContainer position="bottom-left"
          theme='dark'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />

        <NavBar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/index" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/*" element={<Error />} />
          <Route path="/cities" element={<Cities />} />
          <Route path='/city/:id' element={<Detail />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>

        <Footer />

        <ScrollToTop
          smooth
          viewBox='0 0 24 24'
          svgPath="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"
        />
      </>
    </div>

  );
}


export default App;
