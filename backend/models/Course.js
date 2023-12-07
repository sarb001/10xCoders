const mongoose = require('mongoose');

const CourseSchema = new  mongoose.Schema({
     title: {
        type:String,
        required : [true," Please Enter Course Title "]
    },
    courseposter: {
        public_id : String,
        url : String
    },
    price : {
        type:Number,
        required : [true," Please Enter Price "]
     },
    creator : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

mongoose.models = {}

const Course =  mongoose.models.Course || mongoose.model('Course',CourseSchema);

module.exports = Course;