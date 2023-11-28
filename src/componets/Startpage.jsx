import React from 'react'
import styles from "./Startpage.module.css"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
function Startpage() {
  const history=useNavigate()
  return (
    <div className={styles.maindiv}>
        <div className={styles.wrapdiv}>
            <img className={styles.imges} src="https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image"></img>
            <div className={styles.imagecontent}>
               <img src={logo} alt="Logoimage" />
               <h2>Christ Venue Booking</h2>
               <div className={styles.authdiv}>
                <button onClick={()=>history("/login")}>Login</button>
                <button onClick={()=>alert("Registration is closed Temporarily")}>Register</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Startpage