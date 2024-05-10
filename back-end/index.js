const  express=require("express");
const app=express();
const port= 10000;
const mongoose=require("mongoose");
const userRoutes= require("./API Views/users")
const TaskRoutes= require("./API Views/Tasks")
const cors=require("cors")


app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(TaskRoutes)



mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@cluster0.v1eesfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
   console.log("DB Connected")
})


app.listen(port, ()=>{
    console.log(`server started running in ${port}`)
})

