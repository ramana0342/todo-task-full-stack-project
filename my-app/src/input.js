import { useState } from "react";

const InputCheck =()=>{
    const[A,setA]=useState("Ramana")

    const HandleClick=()=>{
        setA("Ramana Reddy")
    }  

    return(
        <>
        <input onChange={(e)=>{setA(e.target.value)}} type="Text" value={A} placeholder="Enter"/><button onClick={()=>{HandleClick()}}>Click Me</button>
        </>
    )
}

export default InputCheck;