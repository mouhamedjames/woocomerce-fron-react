import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const admin=useSelector((state)=>state.admin.currentUser)
  return (
    <div className={styles.navbar}>
  <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        
        <h4>{admin.username}</h4>
        
      </div>
   
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/service" className={activeLink}>
              Services  requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/Clients" className={activeLink}>
              Clients
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
