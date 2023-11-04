import React, { useState } from 'react'
import styles from "./Signup.module.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { url } from '../API/Api';
function Signup() {
 const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const history=useNavigate()
  const [data,setData]=useState({username:"",useremail:"",usermobileno:"",userdateofbirth:"",usersecurityquestion:"",usersecurityquestionans:""})
  const handle=(event)=>{
  setData({...data,[event.target.name]:event.target.value})
  }
  const validate=()=>{
  for (const field in data)
  {
    if(!data[field])
    return alert(`All Fields must need to fill`)
  }
  if(emailPattern.test(data.useremail))
  return true
  else
  return alert("Enter a Valid Email Id")
  }
  const callApi=()=>{
    const validatecheck=validate()
    if(validatecheck)
    {
     axios.post(`${url}/signup`,{data}).then((responce)=>{
     console.log(responce)
     if(responce.data.success)
     {
     alert("Please Login Now")
     history("/login")
     }
     else
     alert(responce.data.message)
     })
    }
  }
  return (
    <div>
        <div className={styles.logindiv}>
         <h3>Register</h3>
         <p className={styles.logindivp}>Welcome To Christ Venue Booking</p>
         <input type="text" placeholder='Enter Your Name' name="username" onChange={handle}></input>
         <input type="email" placeholder='Enter Your Email id' name="useremail" onChange={handle}></input>
         <input type="text" placeholder='Enter Your Mobile No' name="usermobileno" onChange={handle}></input>
         <input type="text" placeholder='Enter Date of Birth (dd-mm-yyyy)' name="userdateofbirth" onChange={handle}></input>
         <input type="password" placeholder='Enter Your Password' name="userpassword" onChange={handle}></input>
         <select name="usersecurityquestion" onChange={handle}>
            <option value="">Select One Option</option>
            <option value="What is Your pet Names">What is Your Pet Name</option>
            <option value="What is Your Favorite Food">What is Your Favorite Food</option>
            <option value="What is Your college name">What is Your Collge Name</option>
         </select>
         <input type="text" placeholder='Enter Your Ans for Above Question' name="usersecurityquestionans" onChange={handle}></input>
         <p onClick={()=>history("/login")} className={styles.loginp}> Already have account LOGIN</p>
         <div>
         <button onClick={callApi}>Signup</button>
         </div>
        </div>
    </div>
  )
}

export default Signup