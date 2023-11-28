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
  let date
  let time
  const [data,setData]=useState({userdata:statedata.state.user._id,
    venuedata:statedata.state.venue._id,
    personname:"",
    programname:"",
    semdept:"",
    startdateandtime:"",
    enddateandtime:"",
    noofstudents:""
})
  const handle=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  const handlecheck=(event)=>{
    setData({...data,[event.target.name]:event.target.checked})
  }
  const validate=()=>{
    for (const field in data)
  {
    if((field!="projector"&&field!="soundandmic"&&field!="connectionitem"))
    {
      if(!data[field])
      return alert(`All Fields must need to fill`)
    }
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
      console.log(data)
      setLoading(true)
        axios.post(`${url}/booking`,{data}).then((responce)=>{
            if(responce.data.success)
            {
            setLoading(false)
            alert("Booked SuccessFully")
            history("/conformbooking",{state:{venuedata:statedata.state.venue,userdata:statedata.state.user}})
            }
            else
            {
            setLoading(false)
            setBookenable(false)
            setViewbookings(true)
            alert("Conflict In Booking Contact the Admin")
            setBookeddata(responce.data.data)
             date=bookeddata.startdateandtime.split("T")[0]
             time=bookeddata.startdateandtime.split("T")[1]
            }

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
  return (
    <div className={styles.ssbody}>
    <button style={{float:"right",marginRight:"10px"}} onClick={()=>history(-1)}>Back To Home</button>
        <div className={styles.selectwrap}>
            <img src={statedata.state.venue.image} alt="selected Venue image"></img>
            <h1>{statedata.state.venue.name}</h1>
            <div className={styles.selectp}>
                <p>{statedata.state.venue.block}</p>
                <p>Capacity:{statedata.state.venue.capacity}</p>
            </div>
            <div className={styles.selectbutton}>
                <button onClick={()=>setBookenable(true)} className={styles.ssbutton}>Book Now</button>
            </div>
        </div>
        {//booking form div
        bookenable &&<div className={styles.bookwrap}>
         <h2>Christ Auditoruim</h2>
         <div>
            <p>Enter Faculty Name</p>
            <input type="text" name="personname" onChange={handle} ></input>
         </div>
         <div>
            <p>Enter Program/Event Name</p>
            <input type="text" name="programname" onChange={handle} ></input>
         </div>
         <div>
            <p>Enter Related Sementer and Branch Name</p>
            <input type="text" name="semdept" onChange={handle}></input>
         </div>
         <div>
            <p>Enter Faculty Mobile No</p>
            <input type="text" name="phoneno" onChange={handle}></input>
         </div>
         <div>
            <p>Select Start Date and Time (24 hr format)</p>
            <input type="datetime-local" name="startdateandtime" onChange={handle} min={getCurrentDateTime()}></input>
         </div>
         <div>
            <p>Enter End Date and Time (24 hr format)</p>
            <input type="datetime-local" name="enddateandtime" onChange={handle} min={data.startdateandtime}></input>
         </div>
         <div>
            <p>Enter The No of Students Participate</p>
            <input type="number" name="noofstudents" min="1" max="500" onChange={handle} placeholder='Max Limit 500'></input>
         </div>
         <div>
            <p>Select Items if required  (Enable Checkbox)</p>
            <div className={styles.checkdiv}>
              <div>
              <p>Sound and Mic</p>
              <input type="checkbox" name="soundandmic"  onChange={handlecheck} className={styles.checkinput}></input>
              </div>
              <div>
              <p>Projector</p>
              <input type="checkbox" name="projector" onChange={handlecheck} className={styles.checkinput}></input>
              </div>
              <div>
              <p>Connection Accessories</p>
              <input type="checkbox" name="connectionitem" onChange={handlecheck} className={styles.checkinput}></input>
              </div>
            </div>
            <div>
            <p>Remarks</p>
            <input type="textbox" name="remarks" onChange={handle} placeholder="Type Here your remarks"></input>
         </div>
         </div>
         {loading && <p>Checking the Availability for Booking.....</p>}
         <button onClick={callApi} className={styles.bbbbutton}>Book Now</button>
         <img className={styles.close} src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="close" onClick={()=>setBookenable(false)}></img>
        </div>}
        {//viewbookings Popup
            viewbookigs && <div className={styles.viewwrap}>
            <h3 className={styles.h3ofcb}>Already have Booking</h3>
            <img className={styles.close} src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="close" onClick={()=>setViewbookings(false)}></img>
            {bookeddata ? 
                <div className={styles.eachbookdiv}>
                <h3>{bookeddata.programname}</h3>
                <div>
                    <h5>{bookeddata.personname}</h5>
                    <p>{bookeddata.semdept}</p>
                </div>
                <p>Start Date:{bookeddata.startdateandtime.split("T")[0]} Time:{bookeddata.startdateandtime.split("T")[1]}</p>
                <p>End Date:{bookeddata.enddateandtime.split("T")[0]} Time:{bookeddata.enddateandtime.split("T")[1]}</p>
            </div>    
            :<h3 style={{textAlign:"center",fontFamily:"Lobster"}}>Currenty Not Have Any Booking</h3>}
            </div>
        }
    </div>
  )
}

export default Selectedvenue