import './styles/App.css';
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Error from './pages/Error/Error';
import Cities from './pages/Cities/Cities';




function App() {

  return (

    <div className='App'>
        <>
            <NavBar/>

            <Routes>

              <Route path="/" element={<Main/>}/>
              <Route path="/index" element={<Main/>}/>
              <Route path="/home" element={<Main/>}/>
              <Route path="/*" element={<Error/>}/>
              <Route path="/cities" element={<Cities/>}/>

            </Routes>

            <Footer/>
        </>
    </div>

  );
}

export default App;
