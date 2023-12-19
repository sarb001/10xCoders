
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom' ;
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import Courses from './components/Courses/Courses';
import MainCourse from './components/MainCourse';
import RequestCourse from './components/RequestCourse';
import MyCourses from './components/MyCourses';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/Logout/Logout';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';

function App() {

     const  { isAuthenticated , user } = useSelector((state) => state.user);

  return (
    <> 
     <Router>
      <Header />
        <Routes>
           <Route path = "/" element = {<Home />}>  </Route>
           <Route path = "/login" element = {<Login />}>  </Route>
           <Route path = "/signup" element = {<Signup />}>  </Route>
           <Route path = "/logout" element = {<Logout />}>  </Route>
           <Route path = "/courses" element = {<Courses />}>  </Route>

           <Route path = "/mycourses"  element = { <MyCourses />}>  </Route>
           <Route path = "/profile" element = {<Profile />}>  </Route>
           <Route path = "/requestcourse" element = {<RequestCourse />}>  </Route>
           <Route path = "/course/:id" element = {<MainCourse />}>  </Route>
        </Routes>
     </Router>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
