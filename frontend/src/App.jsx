
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom' ;
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import MainCourse from './components/MainCourse';
import RequestCourse from './components/RequestCourse';
import MyCourses from './components/MyCourses';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/Logout/Logout';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';
import AllCourse from './components/AllCourse';
import AllUserCourses from './components/AllUserCourses';
import CreateCourses from './components/CreateCourses';
import PaymentSucces from './components/PaymentSucces';
import NotFound from './components/NotFound';

function App() {

     const   user = useSelector(state => state.user?.user);
     const   MainisAuthenticated  = useSelector(state => state.user?.isAuthenticated);

      console.log('main  user exists --',user);
      console.log('main  isAuthenticated exists --',MainisAuthenticated);

  return (
    <> 
     <Router>
      <Header  />
          <Routes>
            <Route path = "/"  element = {<Home  />}> </Route>
            <Route path = "/login"  element = {<Login />}>  </Route>
            <Route path = "/signup" element = {<Signup />}>  </Route>
            <Route path = "/logout" element = {<Logout />}>  </Route>
            <Route path = "/allcourse"  element = {<AllCourse  />}> </Route>
            <Route path = "/usercourses"  element = {  <AllUserCourses /> }>  </Route>

              <Route path = "/mycourses" 
                 element = { <MyCourses user = {user}  isAuthenticated = {MainisAuthenticated} />}> 
              </Route>

            <Route path = "/profile" element = {  <Profile /> }>  </Route>
              
            <Route path = "/requestcourse" element = {MainisAuthenticated ? <RequestCourse /> : <NotFound />}>  </Route>

            <Route path = "/createcourse" element = {MainisAuthenticated  ?   <CreateCourses /> : <NotFound /> }>  </Route>

            <Route path = "/paymentsuccess"   
            element = {<PaymentSucces user = {user}  />}>  </Route>
              
             <Route path= "*"  element = {  <NotFound /> }  />

              <Route path = "/course/:id"
                element = {<MainCourse  />}>  
              </Route>

          </Routes>
       </Router>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
