import React from 'react'
import styles from "./Homesreen.module.css"
import { useNavigate } from 'react-router-dom'
function Homescreen() {
 const history=useNavigate()
  return (
    <div>
    <img  className={styles.adminimage} src="https://img.freepik.com/premium-photo/neon-pc-gaming-room-rgb-color-glow-effect_717440-435.jpg?w=2000" alt="adminbgimage" />
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