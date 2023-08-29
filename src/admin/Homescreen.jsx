import React from 'react'
import styles from "./Homesreen.module.css"
import { useNavigate } from 'react-router-dom'
function Homescreen() {
 const history=useNavigate()
  return (
    <div>
    <img  className={styles.adminimage} src="https://img.freepik.com/premium-photo/neon-pc-gaming-room-rgb-color-glow-effect_717440-435.jpg?w=2000" alt="adminbgimage" />
    <h1>Welcome To Admin Panel</h1>
    <div className={styles.innerwrapdiv}>
        <div onClick={()=>history("/addvenue")}>
            <h3>Add Venue</h3>
        </div>
        <div>
            <h3>Update Users</h3>
        </div>
        <div>
            <h3>Update Bookings</h3>
        </div>
        <div>
            <h3>View Bookings</h3>
        </div>
    </div>
    </div>
  )
}

export default Homescreen