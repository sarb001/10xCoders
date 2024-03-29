
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsersCourses } from '../Actions/course';
import { BuyCourse, LoadUser, PaymentVerification } from '../Actions/User';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css' ;
import axios from 'axios';
import Loader from './Loader';

const AllUserCourses = () => {

  
  const { isAuthenticated , user } = useSelector((state) => state.user);
  console.log('user in except course -',user);
  console.log('Auth in except course -',isAuthenticated);

   const navigate = useNavigate();
   const { newcourse , loading }   = useSelector(state => state.usercourse);

    console.log('  except course -',newcourse);
    const  dispatch = useDispatch();
    
    const course  = useSelector(state => state.user?.course);
    console.log(' Specific Course -' ,course);

    useEffect(() => {
      dispatch(AllUsersCourses());
      dispatch(LoadUser());
    },[dispatch])

    const BuyingCourseHandler = async(courseid) => {
      console.log('id is --',courseid);

     await  dispatch(BuyCourse(courseid));
     await  dispatch(PaymentVerification(courseid));
      handlecheckout(course?.price,courseid);
    }

    const handlecheckout = async(price,id) => {               
      console.log('inside price -',price);

      const { data : { key } } = await axios.get(`/api/v1/razorpaykey`);
      const { data : {order} } = await axios.get(`/api/v1/payment/${id}`);

       console.log('data in order- ',{order});
       console.log('order id -',order.id);

       console.log('order amount  -',order.amount);

        console.log('key in  data --',key);
        console.log('windoww- ',window);

        const options = {
          key : key,
          amount:order?.amount,
          currency:"INR",
          name:"Sinmplyjs",
          description:"Razorpay tutorial",
          order_id:order?.id,
          callback_url:`/api/v1/paymentverification/${id}`,
          prefill:{
            name:"Amandeep gupta",
            email:"amandeepguptasir@gmail.com",
            contact:"1234567890"
          },
          notes:{
            "address":"razorapy official"
          },
          theme:{
            "color":"#3399cc"
          }
        };

        console.log('at last  razorpay -');
        const razor = new Razorpay(options);
        razor.open();
    }

  return (
  <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>

        <div className="right-section" style = {{margin:'1%'}}>
          <h2> All  User Cases  </h2>
            
                 <div className="courselist">
                  {  loading  ? <Loader /> : (
                    <>
                       {newcourse?.map((item) => (
                          <div className = 'course-container' key = {item._id}> 
                              <img src =  {item.courseposter.url}
                              style = {{width:'100%', height:'220px',
                              objectFit:'cover',display:'block'
                            ,borderRadius:'25px'}} />
                        
                            <span id = "course-detail">
                              <span> Title - {item.title} </span>
                              <span> Price - {item.price} </span>
                              <span> Creator - {item.creator.name} </span>
                              <span> Lectures - {item.lectures.length} </span>
                              <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                              
                              <span>
                                    
                                      {item.order?.status === "paid" ? ( 
                                      <> 
                                          <Link to = {`/course/${item._id}`}>
                                            <button className = "view detail"> View Details </button>
                                          </Link>
                                      </>) : (
                                      <>
                                        <button onClick = {()  => BuyingCourseHandler(item._id)}
                                        className = "view detail"> Buy Now  </button>
                                      </>)}

                                </span>
                            
                              {/* <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button> */}
                              </div>
                            </span>

                          </div>
                        ))}
                    </>
                  ) }
                
                 </div>
        </div>
  </div>
  )
}

export default AllUserCourses
