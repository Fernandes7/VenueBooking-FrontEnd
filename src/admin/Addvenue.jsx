import React, { useState } from 'react'
import style from "./Addvenue.module.css"
import { url } from '../API/Api'
import axios from 'axios'
function Addvenue() {
  const [data,setData]=useState({})
  const [loading,setLoading]=useState(false)
  const handle=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  const handleimage=(event)=>{
    setData({...data,[event.target.name]:event.target.files[0]})
  }
  const callApi=()=>{
  setLoading(true)
  const passdata=new FormData()
  passdata.append("name",data.name)
  passdata.append("block",data.block)
  passdata.append("capacity",data.capacity)
  passdata.append("image",data.image)

  axios.post(`${url}/addvenue`,passdata).then((responce)=>{
    setLoading(false)
    if(responce.data.success)
    alert("Image and Data Uploaded Successfully")
    else
    alert("Failed to Upload Image and data")
  })
  }
  return (
    <div>
        <div className={style.divwrap}>
            <h2>Add Venue</h2>
            <input type="text" placeholder="Enter the Venue Name" name="name" onChange={handle}></input>
            <input type="text" placeholder="Enter the Venue Block" name="block" onChange={handle}></input>
            <input type="text" placeholder="Enter the Seating Capacity" name="capacity" onChange={handle}></input>
            <p>Upload The Venue Image</p>
            <input type="file" name="image" onChange={handleimage}></input>
            {loading && <p style={{textAlign:"center"}}>Uploading Data.....</p>}
            <button onClick={callApi}>Add Venue</button>
        </div>
    </div>
  )
}

export default Addvenue