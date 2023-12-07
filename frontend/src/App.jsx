
import './App.css'
import {  BrowserRouter , Route , Routes } from 'react-router-dom' ;
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import Courses from './components/Courses/Courses';

function App() {

  return (
    <> 
    <Header />
      <BrowserRouter>
        <Routes>
           <Route path = "/" element = {<Home />}>  </Route>
           <Route path = "/login" element = {<Login />}>  </Route>
           <Route path = "/signup" element = {<Signup />}>  </Route>
           <Route path = "/courses" element = {<Courses />}>  </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
