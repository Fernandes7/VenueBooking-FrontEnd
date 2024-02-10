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
        console.log("My Bookings",responce.data)
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
    <div className={styles.bookingallwrapdiv}>
        <div className={styles.headdiv}>
        <h3 className={styles.yourbookingh3}>Your Bookings</h3>
        </div>
        <div className={styles.bookingwrap}>
        {(bookings && bookings.length>0) ? bookings.map((item,key)=>{
          if(item.isoutdated==false)
          {
            return(
              <div className={styles.innerviewdiv}>
           <div className={styles.rview}>
            <div>
            <h3>{item.programname}</h3>
            <p className={styles.pview}>Name:{item.personname}</p>
            <p>Department: {item.semdept}</p>
            <p>Mobile No:{item.phoneno}</p>
            <p>No of Students</p>
            <div className={styles.chdiv}>
                <img src='https://cdn-icons-png.flaticon.com/128/115/115352.png' className={styles.chimg}></img>
                <p>{item.noofstudents} Students</p>
            </div>
            </div>
            <div>
             <h3 style={{textAlign:"center",width:"175px"}}>{item.venuedata.name}</h3>
             <img className={styles.rviewimg} src={item.venuedata.image}></img>
            </div>
           </div>
             <div className={styles.tview}>
                <div className={styles.tiv}>
                    <div className={styles.itview}>
                        <img src='https://cdn-icons-png.flaticon.com/128/223/223404.png'></img>
                        <p>Start Time</p>
                    </div>
                    <p>{item.startdateandtime}</p>
                </div>
                <div className={styles.tiv}>
                    <div className={styles.itview}>
                        <img src='https://cdn-icons-png.flaticon.com/128/223/223404.png'></img>
                        <p>End Time</p>
                    </div>
                    <p>{item.enddateandtime}</p>
                </div>
             </div>
             <h4>Required Items...</h4>
             <div className={styles.opdiv}>
             {item.soundandmic &&<div className={styles.chdiv}>
                <img src='https://cdn-icons-png.flaticon.com/128/860/860330.png' className={styles.chimg}></img>
                <p>Sound & Mic</p>
            </div>}
            {item.projector && <div className={styles.chdiv}>
                <img src='https://cdn-icons-png.flaticon.com/128/3172/3172514.png' className={styles.chimg}></img>
                <p>Projector</p>
            </div>}
            {item.connectionitem &&  <div className={styles.chdiv}>
                <img src='https://cdn-icons-png.flaticon.com/128/2422/2422543.png' className={styles.chimg}></img>
                <p>Extension Cable</p>
            </div>}
             </div>
             <p className={styles.remarksp}>Remarks:</p>
             <p>{item.remarks}</p>
             <button onClick={()=>handle(item.programname)} className={styles.cbbutton}>Cancel Booking</button>
         </div>
            )
          }
        }):<h3 style={{textAlign:"center",fontFamily:"Lobster"}}>You Didnt Have any Bookings</h3>}
        </div>
        {conformdeleteenable &&<div className={styles.conformdelete}>
            <p> Do you want to Cancel Booking of {deletename}</p>
            <div>
            <button onClick={()=>setConformdeleteenable(false)}>No</button>
            <button onClick={deletes}>Yes</button>
            </div>
        </div>}
    </div>
  )
}

export default Bookings