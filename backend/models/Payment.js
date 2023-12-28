import mongoose from "mongoose";


const PaymentSchema = new mongoose.Schema({
    razorpay_signature: {
        type: String,
        required : true,
    },
    razorpay_payment_id : {
        type: String,
        required : true,
    },
    razorpay_subscription_id: {
        type: String,
        required : true,
    },
    createdAt : {
        type:Date,
        default : Date.now,
    }
})

mongoose.models = {}

const Payment =  mongoose.models.Payment || mongoose.model('Payment',PaymentSchema);

export default Payment