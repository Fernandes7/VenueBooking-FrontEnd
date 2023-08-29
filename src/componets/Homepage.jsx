import React, { useEffect, useState } from 'react'
import styles from "./Homepage.module.css"
import logo from "../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { url } from '../API/Api'
import axios from 'axios'
function Homepage() {
const [venuedata,setVenuedata]=useState()
useEffect(()=>{
axios.get(`${url}/getallvenue`).then((responce)=>
{
if(responce.data.success)
setVenuedata(responce.data.data)
})
 },[])
  const history=useNavigate()
  const data=useLocation()
  return (
    <div>
        <div className={styles.sub}>
            <img src="https://www.cce.edu.in/static/images/home.jpg" alt="homescreenimage" className={styles.homeimage}></img>
            <div className={styles.navbarwrap}>
                <img src={logo} alt="logimage" /> 
                <div className={styles.navoptionsdiv}>
                    <ul>
                        {data.state.data.isAdmin && <li onClick={()=>history("/admin")}>Admin</li>}
                        <li>Bookings</li>
                        <li onClick={()=>history("/")}>Logout</li>
                    </ul>
                </div>
            </div>
            <p className={styles.usernamep}>Welcome {data && data.state.data.username}</p>
            <h2 className={styles.homeimagetext}>Welcome to Venue Booking of Christ College of Engineering Irinjalakuda</h2>
        </div>
        <h2 className={styles.subheading}>Christ Venues</h2>
        <div className={styles.venuewrapdiv}>
        {venuedata && venuedata.map((item,key)=>{
            return(
            <div key={key} className={styles.venuecard} onClick={()=>history("/selectedvenue",{state:{userid:data.state.data._id,venue:item}})}>
            <img src={item.image} alt="venueimages" />
            <div>
            <h3>{item.name}</h3>
            <p>{item.block}</p>
            </div>
         </div>
        )
        })}
        </div>
    </div>
  )
}

export default Homepage