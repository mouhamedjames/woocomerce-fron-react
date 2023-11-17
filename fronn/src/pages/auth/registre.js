import { useState ,useEffect} from "react";
import styles from "./auth.module.scss";
import Loader from "../../components/loader/loader.js"
import { useSelector } from "react-redux";
import registerImg from "../../assets/register.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess, logout } from "../../redux/userRedux.js";
const Registre = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setemailError] = useState('');
  const [userError, setuserError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isloading, setisloading] = useState(false);
  
  const user= useSelector((state) => state.user.currentUser)
  useEffect(()=>{
  if (user !== null){
    navigate("/")
  
  }
  
  
  
  }
  
  
  
  
  , [user])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Check password strength
    if (newPassword.length > 0 && newPassword.length < 8) {
      setPasswordError('Password is too short');
    } else if (newPassword.length >= 8 && !/[A-Z]/.test(newPassword)) {
      setPasswordError('Password should contain at least one uppercase letter');
    } else {
      setPasswordError('');
    }
  };

  const registeruser = async (e) => {
    e.preventDefault()
    setisloading(true)
    setemailError('')
    setuserError('')
    if (password.length >= 8 && /[A-Z]/.test(password)) {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8500/api/auth/singin", { username, email, phone, password });
      const ress = await axios.post("http://localhost:8500/api/auth/singup", { email,password })
      
        dispatch(loginSuccess(ress.data));
      
      navigate("/")
    } catch (error) {
      setisloading(false)
      const a =error.response.data.message
      console.log(a)
      console.log(a.includes("email_1 dup"))
      if (a.includes("email_1 dup")===true){
        setemailError("email has beed used")
      }
     else if ((a.includes("username_1 dup")===true))
      
      {

        setuserError("user has beed used")

      }


      dispatch(loginFailure());
    }
  }
  else {
    // Display an error message if the password requirements are not met
    setPasswordError('Password should be at least 8 characters long and contain at least one uppercase letter.');
  }


}





  return (
    <div>

      {isloading && <Loader />}
      <section className={`container ${styles.auth}`}>

        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registeruser} >
            <input
              type="text"
              placeholder="user"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
  {userError && <div className="error">{userError}</div>}
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
              {emailError && <div className="error">{emailError}</div>}
            <input
              type="Password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div className="error">{passwordError}</div>}
            <input
              type="text"
              placeholder="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
              </button>
          </form>

          <span className={styles.register}>
            <p>Already an account?</p>
            <Link to="/login">Login</Link>
          </span>
          
        </div>

        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </div>
  )
}

export default Registre
