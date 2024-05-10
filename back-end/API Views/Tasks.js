const express= require("express");
 const router= express.Router();
 const  userSchema= require("../Model/user")
 const  TaskSchema=require("../Model/toDoTask")
 let jwt = require("jsonwebtoken")
 const mongoose = require("mongoose")
 const { ObjectId } = mongoose;
 
 



 
 router.post("/addTask",async(req,res)=>{
       let token = req.headers.authorization;
       let tokenResult = jwt.verify(token,"Shh");
       const Tasks = new TaskSchema({UserID:tokenResult.userID,Task:req.body.Task})
       let  userTasks=await Tasks.save()
         return res.json({
            Success:"Task Was Added in DB",
          })
        })


  router.get("/getUserTasks",async(req,res)=>{
    let token = req.headers.authorization;
    let tokenResult = jwt.verify(token,"Shh");
    let TaskData=await TaskSchema.find({UserID:tokenResult.userID})
      return res.json({
        TaskData
      })
  })


  router.put("/UpDataTask/:id",async(req,res)=>{
          let TaskId=req.params.id
          await TaskSchema.findByIdAndUpdate(TaskId,req.body)
          return res.json({
            Success:"Task Was Updated in DB"
          })
      
      
  })

  router.delete("/DeleteTask/:id",async(req,res)=>{
            let TaskId=req.params.id
            await TaskSchema.findByIdAndDelete(TaskId)
            return res.json({
            Success:"Task Was deleted in DB"
            })
  })
 
 
  module.exports=router;