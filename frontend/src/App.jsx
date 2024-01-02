
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

function App() {

     const  { isAuthenticated , user } = useSelector((state) => state.user);
      console.log('main  user exists --',user);
      console.log('main  isAuthenticated exists --',isAuthenticated);

  return (
    <> 
     <Router>
      <Header user = {user}  isAuthenticated = {isAuthenticated}  />
          <Routes>
            <Route path = "/"  
              element = {<Home  user = {user}  isAuthenticated = {isAuthenticated} />}>  
            </Route>
            <Route path = "/login"  element = {<Login />}>  </Route>
            <Route path = "/signup" element = {<Signup />}>  </Route>
            <Route path = "/logout" element = {<Logout />}>  </Route>

              <Route path = "/allcourse" 
                element = {<AllCourse  />}>  
              </Route>

             <Route path = "/usercourses" 
                element = { <AllUserCourses user = {user}  isAuthenticated = {isAuthenticated} />}> 
              </Route>

              <Route path = "/mycourses" 
                 element = { <MyCourses user = {user}  isAuthenticated = {isAuthenticated} />}> 
              </Route>

            <Route path = "/profile"
              element = {<Profile   user = {user} />}>  </Route>
              
            <Route path = "/requestcourse" element = {<RequestCourse />}>  </Route>

            <Route path = "/createcourse" element = {<CreateCourses />}>  </Route>

            <Route path = "/paymentsuccess"   
            element = {<PaymentSucces user = {user}  />}>  </Route>
              


            {/* <Route path = "/subscribe"   
            element = {<Subscribe  user = {user}  />}>  </Route>


            <Route path = "/paymentfailed"   
            element = {<PaymentFailed  user = {user}  />}>  </Route> */}


              <Route path = "/course/:id"
                element = {<MainCourse user = {user}  isAuthenticated = {isAuthenticated} />}>  
              </Route>

              <Route path = "/createcourse"
                element = {<CreateCourses user = {user}  isAuthenticated = {isAuthenticated} />}>  
              </Route>

          </Routes>
     </Router>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
