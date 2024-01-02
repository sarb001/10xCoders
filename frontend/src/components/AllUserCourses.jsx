import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsersCourses } from '../Actions/course';
import { BuyCourse, LoadUser } from '../Actions/User';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import '../styles/App.css' ;
import axios from 'axios';

const AllUserCourses = () => {

   const allusercourse  = useSelector(state => state.allusers?.courses);

    console.log(' course for except user -',allusercourse);
    const  dispatch = useDispatch();
    
    const course  = useSelector(state => state.user?.course);
    console.log(' specificOrder  111 -' ,course);
    
    useEffect(() => {
      dispatch(AllUsersCourses());
      // dispatch(LoadUser());
    },[dispatch])

    const BuyingCourseHandler = (id) => {
      console.log('id is --',id);
      dispatch(BuyCourse(id));

      handlecheckout(course?.price,id);
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
          callback_url:`/api/v1/paymentverification`,
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
                   {allusercourse?.map((item) => (
                      <div className = 'course-container' key = {item._id}> 
                          <img src =  {item.courseposter.url}  style = {{width:'100%', height:'220px',
                        objectFit:'cover',display:'block'
                        ,borderRadius:'25px'}} />
                     
                        <span id = "course-detail">
                          <span> Title - {item.title} </span>
                          <span> Price - {item.price} </span>
                          <span> Creator - {item.creator.name} </span>
                          <span> Lectures - {item.lectures.length} </span>
                          <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                            <span>
                                 
                                <button onClick = {()  => BuyingCourseHandler(item._id)}
                                 className = "view detail"> Buy Now </button>
                            </span>
                         
                          {/* <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button> */}
                          </div>
                        </span>

                      </div>
                   ))}
                 </div>
        </div>
  </div>
  )
}

export default AllUserCourses


{/* <span>
  <Link to = {`/course/${item._id}`}>
    <button className = "view detail"> View Details </button>
  </Link>
</span> */}