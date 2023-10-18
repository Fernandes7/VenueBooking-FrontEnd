import React, { useEffect, useState } from 'react'
import styles from "./Bookings.module.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { url } from '../API/Api'
import axios from 'axios'
function Bookings() {
  const history=useNavigate()
  const data=useLocation()
  console.log("bookings",data)
  const [bookings,setBookings]=useState()
  const [conformdeleteenable,setConformdeleteenable]=useState(false)
  const [deletename,setDeletename]=useState()
  useEffect(()=>{
    axios.post(`${url}/viewbookingbyuserid`,{userdata:data.state.userid}).then((responce)=>{
        if(responce.data.success)
        {
        setBookings(responce.data.data)
        }
    })
  },[conformdeleteenable])
  const handle=(name)=>{
    setConformdeleteenable(true)
    setDeletename(name)
  }
  const deletes=()=>{
    axios.post(`${url}/deletebookingbyuserid`,{_id:deletename._id}).then((responce)=>{
        if(responce.data.success)
        {
            setConformdeleteenable(false)
            alert("Booking Removed Successfully")
        }
    })
  }
  return (
    <div>
        <h3 className={styles.yourbookingh3}>Your Bookings</h3>
        <button style={{float:"right",marginRight:"10px"}} onClick={()=>history(-1)}>Back To Home</button>
        <div className={styles.bookingwrap}>
        {(bookings && bookings.length>0) ? bookings.map((item,key)=>{
          if(item.isoutdated==false)
          {
            return(
          <div key={key} className={styles.eachbookingdiv}>
            <img src={item.venuedata.image} alt="booking images" />
            <div>
                <h3>{item.venuedata.name}</h3>
                <p>{item.venuedata.block}</p>
                <button onClick={()=>handle(item)}>Cancel Booking</button>
            </div>
          </div>
            )
          }
        }):<h3 style={{textAlign:"center",fontFamily:"Lobster"}}>You Didnt Have any Bookings</h3>}
        </div>
        {conformdeleteenable &&<div className={styles.conformdelete}>
            <p> Do you want to Cancel {deletename.venuedata.name}</p>
            <div>
            <button onClick={()=>setConformdeleteenable(false)}>No</button>
            <button onClick={deletes}>Yes</button>
            </div>
        </div>}
    </div>
  )
}

export default Bookings