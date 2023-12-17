import React ,{ useEffect } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { CourseLectures } from '../Actions/course.js' ;

const MainCourse = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    console.log('params is --',{ id });

     const  { Lectures }  = useSelector((state) => state.allusers);
     console.log('Lectures -',Lectures);

      useEffect(() => {
        dispatch(CourseLectures(id));
      }, [dispatch])

  return (
    <div>
        <h1> Lectures Inside Courses </h1>
         {Lectures.length > 0  ? (<> 
           {Lectures.map((item) =>  
           <div key = {item._id}>
              <h2>{item.title} </h2> 
              <h2>{item.description} </h2> 
                <video width="400" height="300" controls>
                    <source src = {item.video.url} type="video/mp4">
                    </source>
                </video>
           </div>
           )}
         </>) : (<>  No Lectures Present </>)}
    </div>
  )
}

export default MainCourse