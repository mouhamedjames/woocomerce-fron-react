import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar.js";
import Home from "../../components/admin/home/Home.js";
import AddProduct from "../../components/admin/addProduct/AddProduct.js";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts.js"
import Orders from "../../components/admin/orders/Orders.js";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails.js";
import Services from "../../components/admin/service/service.js";
import Servicesdetaills from "../../components/admin/service/servicedetaile.js";
import Client from "../../components/admin/client/client.js"
import UpdateProduct from "../../components/admin/addProduct/updateproduct.js";
/*import AddProduct from "../../components/admin/addProduct/AddProduct";

import Home from "../../components/admin/home/Home.js";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";*/
import { useSelector } from "react-redux";
import { Link, useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess, logout } from "../../redux/reduxadmin.js";
const Admin = () => {
const admin=useSelector((state)=>state.admin.currentUser)
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate()
const dispatch=useDispatch()
const handlelogin=async (e)=>{
 
    e.preventDefault()
    dispatch(loginStart());
try{console.log(password)
        const res = await axios.post("http://localhost:8500/api/admin/singup", { username,password })
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        navigate("/admin/")
  }
catch(err)

{  dispatch(loginFailure());}
}



  return (
    <div>
      { admin ?
        <div className={styles.admin}>
        
        
    
      <div className={styles.navbar} >
      <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>
      
        <Route path="" element={<Home />} />
        < Route path="all-products" element={<ViewProducts />} />
        <Route path="add-product/" element={<AddProduct />} />
        <Route path="update-product/:id" element={<UpdateProduct />} />
        <Route path="order-details/:id" element={<OrderDetails />} />
        <Route path="orders" element={<Orders />} />
        <Route path="service" element={<Services />} />
        <Route path="service-details/:id" element={<Servicesdetaills />} />
        <Route path="Clients" element={<Client />} />
        
        </Routes>
         </div> </div>
      :<div>
          <form>
          <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button  style={{ padding: 10, width:100 }}onClick={handlelogin}>
        Login
      </button>
    </div>
    </form>
    </div>
      }
  </div>
 
    
  );
};

export default Admin;
