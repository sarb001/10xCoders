const mongoose = require('mongoose') ;

exports.connectDb = () => {
    mongoose.connect(process.env.DB_URL , {
        dbName : process.env.DB_NAME
     })
    .then((conn)=>  console.log(`Database Connected  ${conn.connection.host}`))
    .catch((error) => console.log('error -',error))
}