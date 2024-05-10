const mongoose= require("mongoose");
const { ObjectId } = mongoose;

let ToDoTaskSchema=new mongoose.Schema({
    UserID:{
        type: ObjectId,
        required:true
    },
    Task:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("Task",ToDoTaskSchema)