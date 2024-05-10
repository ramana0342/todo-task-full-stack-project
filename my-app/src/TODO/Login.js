import React from "react";
import "./App.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const UserLogin = ({ LoginStatus, setLoginStatus }) => {

  let navigate = useNavigate()
  const [userLogin, setuserLogin] = useState({ Eamil: "", Password: "" });
  const [LoginError, setLoginError] = useState("")

  
  
  const handleChange = (field, value) => {
    setLoginError("")
    setuserLogin({ ...userLogin, [field]: value })
  }



  const LoginEvent = () => {
    axios.post("https://todo-task-full-stack-project.onrender.com/login", userLogin).then((res) => {
      console.log(res.data)
      if (res.data.Success) {
        setLoginError("")
        setLoginStatus(true)
        alert("Logged Succesfully");
        sessionStorage.setItem("Token", JSON.stringify(res.data.Token));
        navigate("/showUserTasks/")
      } else {
        setLoginStatus()
        setLoginError(res.data.Error)
      }
    })
  }

  return (<>

    <div class="Logincontainer">
      <div className="Loginform">
        <h3><b>Plese LogIn</b></h3>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label><br />
          <input
            onChange={(e) => { handleChange("Email", e.target.value) }}
            type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" />

        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"><b>Password:</b></label><br />
          <input
            onChange={(e) => { handleChange("Password", e.target.value) }}
            type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
        </div>
        <div className="Login-btn">
          <button onClick={() => { LoginEvent() }} type="submit" class="btn btn-primary" id="submit">LogIn</button>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Don't have An Account ?</b><br /> <NavLink to="/"><b>REGISTER</b></NavLink></div>
        <div>{LoginStatus == true ? <b style={{ color: "green" }}>Logged Succesfully , Plese Wait</b> : ""}
          {LoginError ? <b style={{ color: "red" }}>{LoginError}</b> : ""}
        </div>
      </div>
    </div>


  </>)
}

export default UserLogin