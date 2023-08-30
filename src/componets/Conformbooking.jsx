import React from 'react'
import styles from "./Conformbooking.module.css"
import {  useLocation, useNavigate } from 'react-router-dom'
function Conformbooking() {
  const history=useNavigate()
  const data=useLocation()
  console.log("conformboks",data)
  return (
    <div className={styles.maindivs}>
        <div className={styles.conformbookdiv}>
            <h2>Your Booking has Recorded Successfully</h2>
            <h4>Venue: {data.state.venuedata.name}</h4>
            <p>Booking id: {data.state.userdata._id}</p>
            <button onClick={()=>history("/home",{state:{data:data.state.userdata}})}>Back To Home Page</button>
        </div>
    </div>
  )
}

export default Conformbooking