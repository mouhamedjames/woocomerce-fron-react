import styles from "./auth.module.scss";
import { Link, useNavigate,useParams } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import React,{ useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

const Rest = () => {
    const { id } = useParams();
  const user= useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  useEffect(()=>{
  if (user !== null){
    navigate("/")
  
  }
  
  
  
  }
  
  
  
  
  , [user])
  const handlelogin=async (e)=>{
 
    e.preventDefault()
    try{
        if (password===password2){
const res= await axios.post("http://localhost:8500/api/reset/changepassword/"+id,{password})
navigate("/")
  

        }
else{
    console.log("passwordnot match")
}

    }

catch(error)
{
  console.log(error.response.data)
}
  }
    return (

        <section className={`container ${styles.auth}`}>
        

     
          <div className={styles.form}>
            <h2>New password</h2>

            <form >
              <input
                type="text"
                placeholder="NewPassword"
                required
               onChange={(e)=>setPassword(e.target.value)}
              />
<input
                type="text"
                placeholder="repeatPassword"
                required
               onChange={(e)=>setPassword2(e.target.value)}
              />

              <button onClick={handlelogin} className="--btn --btn-primary --btn-block">
                change password
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
