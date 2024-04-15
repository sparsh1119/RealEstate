import mongoose  from "mongoose";

const feedbackSchema =  new mongoose.Schema({
    username:{
        type :String,
        required : true,
    },
    feedback:{
        type: String,
        required: true,
    },
	rating: {
		type: Number,
		required: true,
	},
    userRef :{
        type : String,
        required :true,
    }
},{timestamps : true});

const Feedback = mongoose.model('Feedback' , feedbackSchema);

export default Feedback;