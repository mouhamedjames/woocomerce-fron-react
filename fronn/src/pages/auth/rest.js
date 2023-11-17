import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import React,{ useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

const Rest = () => {

  const user= useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  useEffect(()=>{
  if (user !== null){
    navigate("/")
  
  }
  
  
  
  }
  
  
  
  
  , [user])
  const handlelogin=async (e)=>{
 
    e.preventDefault()
    try{
const res =await axios.post("http://localhost:8500/api/reset/resetpassword",{ email })
console.log("good")
    }

catch(error)
{console.log(email)
  console.log(error.response.data)
}
  }
    return (

        <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>

     
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form >
              <input
                type="text"
                placeholder="Email"
                required
               onChange={(e)=>setEmail(e.target.value)}
              />

              <button onClick={handlelogin} className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
     
      </section>
    )
}

export default Rest
