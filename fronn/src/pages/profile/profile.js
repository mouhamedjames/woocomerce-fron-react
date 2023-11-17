import { useDispatch } from "react-redux";
import axios from  "axios"
import React, { useEffect ,useState} from "react";
import styles from "./profile.module.scss";
import { useSelector } from "react-redux";
const Profile=()=>{

const  user=useSelector((state) => state.user.currentUser)
return(
 


<div className={styles.profile}>
      <h1>User Profile</h1>
      <div className={styles["profile-img"]}>
        <img src="path_to_image.jpg" alt="Profile Picture" />
      </div>
      <div className={styles["profile-details"]}>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> New York, USA</p>
        <p><strong>Website:</strong> <a href="http://example.com">http://example.com</a></p>
      </div>
      <button className={styles["edit-button"]}>Edit Profile</button>
    </div>

)



}
export default Profile