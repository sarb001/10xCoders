const mongoose = require('mongoose');

const CourseSchema = new  mongoose.Schema({
     title: {
        type:String,
        required : [true," Please Enter Course Title "]
    },
     description : {
        type:String,
        required : [true," Please Enter Description "]
    },
    courseposter: {
        public_id : String,
        url : String
    },
    price : {
        type:Number,
        required : [true," Please Enter Price "]
     },
    creator : 
    {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
    },
    lectures : [
        {
            title : {
                type  :String,
                required : true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id : {
                    type : String,
                    required : true
                },
                url : {
                     type  :String,
                     required : true
                }
            }
        }
    ]
})

mongoose.models = {}

const Course =  mongoose.models.Course || mongoose.model('Course',CourseSchema);

module.exports = Course;