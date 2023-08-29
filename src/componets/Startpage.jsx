import React from 'react'
import styles from "./Startpage.module.css"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
function Startpage() {
  const history=useNavigate()
  return (
    <div className={styles.maindiv}>
        <div className={styles.wrapdiv}>
            <img className={styles.imges} src="https://melbournesbestfunctions.com.au/wp-content/uploads/2018/08/August-Blog-4-Event-Venue.png" alt="image"></img>
            <div className={styles.imagecontent}>
               <img src={logo} alt="Logoimage" />
               <h2>Christ Venue Booking</h2>
               <div className={styles.authdiv}>
                <button onClick={()=>history("/login")}>Login</button>
                <button onClick={()=>history("/Signup")}>Register</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Startpage