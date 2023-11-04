import React from 'react'
import styles from "./Loading.module.css"
import logo from "../assets/logo.png"
function Loading() {
  return (
    <div className={styles.loaddiv}>
        <div>
            <img src={logo} alt="loading image"></img>
            <p>Loading....</p>
        </div>
    </div>
  )
}

export default Loading