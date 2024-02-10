import React from 'react'
import styles from "./Homesreen.module.css"
import { useNavigate } from 'react-router-dom'
function Homescreen() {
 const history=useNavigate()
  return (
    <div>
    <img  className={styles.adminimage} src="https://images.unsplash.com/photo-1635614017406-7c192d832072?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="adminbgimage" />
    <h1 style={{color:"white",zIndex:9999,position:"absolute",top:"-100px",minWidth:"400px"}}>Welcome To Admin Panel</h1>
    <button style={{zIndex:9999,position:"absolute",top:"0%",right:"1%",background:"white",color:"black"}} onClick={()=>history(-1)}>Back To Home</button>
    <div className={styles.innerwrapdiv}>
        <div onClick={()=>history("/addvenue")}>
            <h3>Add Venue</h3>
        </div>
        <div onClick={()=>history("/adminviewbooking")}>
            <h3>View Bookings</h3>
        </div>
        <div onClick={()=>history("/adminviewbookinghistory")}>
            <h3>Bookings History</h3>
        </div>
    </div>
    </div>
  )
}

export default Homescreen