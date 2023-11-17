import React from 'react'
import { useSelector ,useDispatch} from "react-redux";
import styles from "./Header.module.scss";
import {  logout } from "../../redux/userRedux.js";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState,useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Notiflix from "notiflix";
const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  )

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms))
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
const Header = () => {
  const[admin,setAdmin]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location = useLocation();
  const id = location.pathname.split("/")[1];
    const [showMenu, setShowMenu] = useState(false);
const user= useSelector((state) => state.user.currentUser)//to catch user connected or no
const quntitie= useSelector((state) => state.cart.cartTotalQuantity)
const confirmlogout = () => {
  Notiflix.Confirm.show(
    "Logout!!!",
    "You are about to deconnected  ",
    "Logout",
    "Cancel",
    function okCb() {
      dispatch(logout())
      navigate("/login")
    },
    function cancelCb() {
      console.log("Delete Canceled");
    },
    {
      width: "320px",
      borderRadius: "3px",
      titleColor: "orangered",
      okButtonBackground: "orangered",
      cssAnimationStyle: "zoom",
    }
  );
};



useEffect(()=>{

if (id==="admin"){
  
  console.log(admin)
  setAdmin(true)
  
console.log(id)
}},[])


    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };
    
      const hideMenu = () => {
        setShowMenu(false);
      };


      const cart = (
        <span className={styles.cart}>
          <Link to="/cart">
            Cart
            <FaShoppingCart size={20} />
            <p>{quntitie}</p>
          </Link>
        </span>
      );








    return (
      
      
      



        <div>
          {admin ?<div></div>
            
            :   <div>
            <header >
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              
              <li>
              
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li> 
              <li>
                <NavLink to="/products/" className={activeLink}>
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/" className={activeLink}>
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
              
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
              {user ?<div>
                <a href="/profile" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi, {user.username}
                  </a>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
              
                  <NavLink to="/Estimations" className={activeLink}>
                    Estimations
                  </NavLink>
                  <NavLink  onClick={confirmlogout} >
                    Logout
                  </NavLink>
                  </div>
               
               :<div>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                
                  <NavLink to="/register" className={activeLink}>
                    Register
                  </NavLink>
                 </div>}
             
              </span>
              {cart}
            </div>
           
          </nav>
          
          <div className={styles["menu-icon"]}>
          
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
      </div> }</div>
    )
}

export default Header
