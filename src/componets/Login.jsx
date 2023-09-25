import React, { useState } from 'react'
import styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../API/Api'
function Login() {
  const history=useNavigate()
  const [data,setData]=useState({})
  const [loading,setLoading]=useState(false)
  const handle=(event)=>{
  setData({...data,[event.target.name]:event.target.value})
  }
  const callAPI=()=>{
    setLoading(true)
    axios.post(`${url}/login`,{data}).then((responce)=>{
        console.log(responce)
        if(responce.data.success)
        {
            setLoading(false)
            alert("Logined Successfully")
            localStorage.setItem("myname",responce.data.user.username)
            history("/home",{state:{data:responce.data.user}})
        }
        else
        alert(responce.data.data)
    })
  }
  return (
    <div>
        <div className={styles.logindiv}>
         <h3>Login Page</h3>
         <p className={styles.logindivp}>Welcome To Christ Venue Booking</p>
         <input type="email" placeholder='Enter Your Email id' name="useremail" onChange={handle}></input>
         <input type="password" placeholder='Enter Your Password' name="userpassword" onChange={handle}></input>
         <p onClick={()=>history("/signup")} className={styles.loginp}>Not have account REGISTER</p>
         <p className={styles.loginp}>Forgot Password</p>
         <div>
         {loading && <p>loading......</p>}
         <button onClick={callAPI}>Login</button>
         </div>
        </div>
    </div>
  )
}

export default Login