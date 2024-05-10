import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const UserTasks = ({ setUpdateFun, DOMUpdate, setDOMUpdate, setUpdateTask }) => {

    const [UserTasks, setUserTasks] = useState([])


    // =====>  Initial GET data from Back-End   
    useEffect(() => {
        let token = JSON.parse(sessionStorage.getItem("Token"))
        const headers = {
            "Authorization": `${token}`
        }
        axios.get("https://todo-task-full-stack-project.onrender.com/getUserTasks", { headers }).then((res) => {
            setUserTasks(res.data.TaskData)
        })
    }, [DOMUpdate])


    // ===>>>   Delete Task  Event

    const DelettTask = (TaskId) => {
        setDOMUpdate()
        axios.delete(`https://todo-task-full-stack-project.onrender.com/DeleteTask/${TaskId}`).then((res) => {
            console.log(res.data)
            setDOMUpdate(res.data)
        })
    }

    const UpdateSymbolClick = (ID, task) => {
        setUpdateFun({ TaskId: ID, Task: task })
        setUpdateTask({ Task: task })
    }


    
    return (<>
        <div className="container GetTask-OUter-Container"  style={{color:"black" , marginTop:"80px"}}>
            <div className="row justify-content-center">
                <div className="col-md-6">

                    {UserTasks.length > 0 ? UserTasks.map((item, index) => {
                        console.log(item)
                        return (<>
                            <div className="GetTask-Inner-Container d-flex justify-content-between" style={{padding:"12px",overflow:"auto"}}>
                                <div><h5><p>{item.Task}</p></h5></div>
                                <div className="d-flex">
                                <div  onClick={() => { DelettTask(item._id) }} style={{marginRight:"10px"}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg></div>  
                                <div  onClick={() => { UpdateSymbolClick(item._id, item.Task) }}><i class="fa-solid fa-pen-to-square"></i></div>
                                </div> 
                                </div>

                        </>)
                    })


                        : <h1 style={{ textAlign: "center", marginTop:"10px"}}>Empty Tasks,Create Your Tasks</h1>}
                </div>
            </div>
        </div>
    
    </>)

}



/*=======================================UserActivity Functional Components===================================================*/

const UserActivity = () => {


    const [userTask, setUserTask] = useState({ Task: "", UserID: "" });   // state  for storing Task Add Task Input Field  for when  ADD Task Event

    const [UpdateFun, setUpdateFun] = useState(null);                // state for Storing the taskID,Task  from GetTasks i.e..  useful to Desides Add Task (or) Update Task buttons

    const [updateTask, setUpdateTask] = useState({ Task: "" })          // state for storing Task in Update Input field When  Update Task Event 

    const [DOMUpdate, setDOMUpdate] = useState()                     // state for Updating DOM  after Tasks Added,Update,Delete Section


    // ======> OnChange Event Trigger When Task is Typing in Input field

    const handleChange = (field, value) => {
        setUserTask({ ...userTask, [field]: value })
    }


    let token = JSON.parse(sessionStorage.getItem("Token"))
    console.log(token)
    let headers = {
        "Authorization": `${token}`,
        "Content-Type": 'application/json'
    }

    //  ====> Onclick Event Trigger  When Click On the Add Task Button

    const AddTaskEvent = () => {
        if (userTask.Task !== "") {
            axios.post("https://todo-task-full-stack-project.onrender.com/addTask", userTask, { headers }).then((res) => {
                console.log(res.data)
                setDOMUpdate(res.data)
                setUserTask({ Task: "" })
            })
        } else {
            alert("Enter Any Task")
        }
    }


    // =====> OnChange Event Trigger When Type Task When Updating The Task       
    const updateHandleChange = (field, value) => {
        setUpdateTask({ [field]: value })
    }




    // ====> Onclick Event Trigger  When Click On the Update Button      

    const UpdatingTask = (TaskId) => {
        if (updateTask.Task !== "") {
            axios.put(`https://todo-task-full-stack-project.onrender.com/UpDataTask/${TaskId}`, updateTask).then((res) => {
                if (res.data.Success) {
                    setDOMUpdate(res.data.Success)
                    setUpdateFun(null)
                }
            })
        } else {
            alert("Type Upadated Task")
        }
    }

    return(<>
    <div className="Main-Div">
    return (<>


        <div class="col d-flex justify-content-center">
            <div class="input-group flex-nowrap " id="inputFields">
                {UpdateFun == null ? <><input onChange={(e) => { handleChange("Task", e.target.value) }} type="text" class="form-control" value={userTask.Task} placeholder="Type Any Task" id="TaskName" />
                    <input onClick={() => { AddTaskEvent() }} class="btn btn-primary" type="submit" value="Add Task" id="submitBtn" /></> :

                    <><input onChange={(e) => { updateHandleChange("Task", e.target.value) }} type="text" class="form-control" value={updateTask.Task} placeholder="Type Any Task" id="TaskName" />
                        <input onClick={() => { UpdatingTask(UpdateFun.TaskId) }} class="btn btn-warning" type="submit" value="Update" id="submitBtn" /></>}
            </div>
        </div>
        <UserTasks setUpdateFun={setUpdateFun} DOMUpdate={DOMUpdate} setDOMUpdate={setDOMUpdate} setUpdateTask={setUpdateTask} />
    </>)
   </div>
   </>)

}


export default UserActivity;