import React, { useState } from 'react'
import styles from "./Selectedvenue.module.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../API/Api'
function Selectedvenue() {
  const history=useNavigate()
  const statedata=useLocation()
  console.log(statedata,"heloo")
  const [bookenable,setBookenable]=useState(false)
  const [viewbookigs,setViewbookings]=useState(false)
  const [loading,setLoading]=useState(false)
  const [bookeddata,setBookeddata]=useState()
  const [data,setData]=useState({userdata:statedata.state.user._id,
    venuedata:statedata.state.venue._id,
    personname:"",
    programname:"",
    semdept:"",
    startdateandtime:"",
    enddateandtime:"",
})
  const handle=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  const validate=()=>{
    for (const field in data)
  {
    if(!data[field])
    return alert(`All Fields must need to fill`)
  }
  if(data.startdateandtime>=data.enddateandtime)
  alert("Select the Program start and End Time Correctly")
  else
  return true
  }
  const callApi=()=>{
    const fulldataadded=validate()
    if(fulldataadded)
    {
      setLoading(true)
        axios.post(`${url}/booking`,{data}).then((responce)=>{
            if(responce.data.success)
            {
            setLoading(false)
            alert("Booked SuccessFully")
            history("/conformbooking",{state:{venuedata:statedata.state.venue,userdata:statedata.state.user}})
            }
            else
            alert(responce.data.data)

        })
    }
  }
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  const viewbookingsApi=()=>{
  setBookenable(false)
  setViewbookings(true)
  axios.post(`${url}/viewbooking`,{venuedata:statedata.state.venue._id}).then((responce)=>{
    if(responce.data.success)
    setBookeddata(responce.data.data)
    else
    alert("Failed to View Bookings")

  })
  }
  return (
    <div>
    <button style={{float:"right",marginRight:"10px"}} onClick={()=>history(-1)}>Back To Home</button>
        <div className={styles.selectwrap}>
            <img src={statedata.state.venue.image} alt="selected Venue image"></img>
            <h1>{statedata.state.venue.name}</h1>
            <div className={styles.selectp}>
                <p>{statedata.state.venue.block}</p>
                <p>Capacity:{statedata.state.venue.capacity}</p>
            </div>
            <div className={styles.selectbutton}>
                <button onClick={viewbookingsApi} >View Bookings</button>
                <button onClick={()=>setBookenable(true)}>Book Now</button>
            </div>
        </div>
        {//booking form div
        bookenable &&<div className={styles.bookwrap}>
         <h2>Christ Auditoruim</h2>
         <div>
            <p>Enter Booking person Name</p>
            <input type="text" name="personname" onChange={handle} ></input>
         </div>
         <div>
            <p>Enter Program Name</p>
            <input type="text" name="programname" onChange={handle} ></input>
         </div>
         <div>
            <p>Enter Related Sementer and Branch Name</p>
            <input type="text" name="semdept" onChange={handle}></input>
         </div>
         <div>
            <p>Select Start Date and Time</p>
            <input type="datetime-local" name="startdateandtime" onChange={handle} min={getCurrentDateTime()}></input>
         </div>
         <div>
            <p>Enter End Date and Time</p>
            <input type="datetime-local" name="enddateandtime" onChange={handle} min={data.startdateandtime}></input>
         </div>
         {loading && <p>Checking the Availability for Booking.....</p>}
         <button onClick={callApi}>Book Now</button>
         <img className={styles.close} src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="close" onClick={()=>setBookenable(false)}></img>
        </div>}
        {//viewbookings Popup
            viewbookigs && <div className={styles.viewwrap}>
            <h3 className={styles.h3ofcb}>Current Bookings</h3>
            <img className={styles.close} src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="close" onClick={()=>setViewbookings(false)}></img>
            {bookeddata && bookeddata.length>0 ? bookeddata.map((item)=>{
                const date=item.startdateandtime.split("T")[0]
                const time=item.startdateandtime.split("T")[1]
                return(
                <div className={styles.eachbookdiv}>
                <h3>{item.programname}</h3>
                <div>
                    <h5>{item.userdata.username}</h5>
                    <p>{item.semdept}</p>
                </div>
                <p>Start Date:{date} Time:{time}</p>
                <p>End Date:{item.enddateandtime.split("T")[0]} Time:{item.enddateandtime.split("T")[1]}</p>
            </div>    
                )
            }):<h3 style={{textAlign:"center",fontFamily:"Lobster"}}>Currenty Not Have Any Booking</h3>}
            </div>
        }
    </div>
  )
}

export default Selectedvenue