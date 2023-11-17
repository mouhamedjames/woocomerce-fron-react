import React,{ useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/loader.js"
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess  } from "../../redux/userRedux.js";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passworderror, setPassworderror] = useState("");
    const [emailerror, setemailerror] = useState("");
    const [isloading, setisloading] = useState(false);
  const navigate = useNavigate()
const dispatch=useDispatch()
const user= useSelector((state) => state.user.currentUser)
useEffect(()=>{ //if anything change it changes and to collect data
if (user !== null){
  navigate("/")

}



}




, [user])

const handlelogin=async (e)=>{
  e.preventDefault() // to block any event
  setisloading(true)
  setPassworderror("")
  setemailerror("")
    
    dispatch(loginStart());
try{
        const res = await axios.post("http://localhost:8500/api/auth/singup", { email,password })
       // sent request to get user login if work data=user on json
        dispatch(loginSuccess(res.data));
        navigate("/")
        //send data with redux to browser memory
  }
catch(error)

{ 

  setisloading(false)
  const a =error.response.data
      console.log(a)
      if (a.includes("password not work")===true){
        setPassworderror("password wrong")
      }
     else if ((a.includes("user not found")===true))
      
      { 
      setemailerror("User not found")

        

      }
  
  dispatch(loginFailure());}
}
    return (
      <>
       {isloading && <Loader />}
          
        <section className={`container ${styles.auth}`}>


        
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        
        <div  className= {styles.card}>

        
          <div className={styles.form}>
            <h2>Login</h2>

            <form >
              <input
                type="text"
                placeholder="Email"
                required
             
                onChange={(e) => setEmail(e.target.value)}
               
              />
              {emailerror && <div className="error">{emailerror}</div>}
              <input
                type="password"
                placeholder="Password"
                required
               
                onChange={(e) => setPassword(e.target.value)}
               
              />
              {passworderror && <div className="error">{passworderror}><br></br></div>}
              
              <button  onClick={handlelogin} className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
          </div>
      </section>
      </>
    )
}

export default Login
