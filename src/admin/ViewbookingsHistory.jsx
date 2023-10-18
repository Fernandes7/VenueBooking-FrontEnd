import React, { useEffect, useState } from 'react'
import styles from "./Viewbooking.module.css"
import axios from 'axios'
import { url } from '../API/Api'
import { useNavigate } from 'react-router-dom'
function ViewbookingHistory() {
 const history=useNavigate()
 const [bookingdata,setBookingData]=useState()
 useEffect(()=>{
    axios.get(`${url}/viewallbooking`).then((responce)=>{
        setBookingData(responce.data.data)
    })
 })
  return (
    <div >
     <button style={{zIndex:9999,position:"absolute",top:"0%",right:"1%",background:"white",color:"black"}} onClick={()=>history(-1)}>Back To Home</button>
        <div className={styles.viewbookmainwrap}>
        <h2>Previous Bookings</h2>
         {bookingdata ? bookingdata.map((item)=>{
            if(item.isoutdated && item.isoutdated==true)
            {
            return (
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
         </div>
            )
            }
         }):<p>Loading datas......</p>}
         
        </div>
    </div>
  )
}

export default ViewbookingHistory