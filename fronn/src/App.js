
import './App.scss'
import React from "react"
import { ToastContainer } from "react-toastify";
import{ BrowserRouter ,Route,Routes} from "react-router-dom"
import Home  from "./pages/home/home.js"
import Header  from "./components/header/header.js"
import Fouter  from "./components/footer/footer.js"
import Login  from "./pages/auth/login"
import Register  from "./pages/auth/registre.js"
import ProductList  from "./pages/product/productlist.js"
import Product from "./pages/product/product.js"
import Reset from "./pages/auth/rest.js"
import Cart  from "./pages/cart/cart.js"
import Checkout from "./pages/checkout/checkoutdetai.js"
import Sucess from "./pages/checkout/checkoutsucess.js"
import OrderHistory from "./pages/orderhistory/orderhistory.js"
import  Orderdetai from "./pages/orderhistory/orderdetail.js"
import Contact from "./pages/contact/contact.js"
import Changepassword from "./pages/auth/changepassword.js"
import Admin from"./pages/admin/admin.js"
import Profile from"./pages/profile/profile.js"
import Service from"./pages/service/service.js"
import Servicesucess from"./pages/service/sucessservice"
import Estimations from "./pages/devis/devis.js"
//the links of the pages
function App() {
  return (
    <div >
   
<BrowserRouter>
<ToastContainer/>
<Header/>

<Routes>

<Route path="/"  element={<Home/>}/>
<Route path="/login"  element={<Login/>}/>
<Route path="/Register"  element={<Register/>}/>
<Route path="/Reset"  element={<Reset/>}/>
<Route path="/products/" element={<ProductList/>}  />
<Route path="/product/:id" element={<Product/>}/>   
<Route path="/cart" element={<Cart />} />  
<Route path="/checkout-details" element={<Checkout />} />  
<Route path="/success" element={<Sucess />} />  
<Route path="/order-history" element={<OrderHistory />} />  
<Route path="/order-details/:id" element={<Orderdetai/>}/>   
<Route path="/contact" element={<Contact/>}/>   
<Route path="/changepassword/:id" element={<Changepassword/>}/> 
<Route path="/admin/*" element={<Admin/>}/>  
<Route path="/profile" element={<Profile/>}/>  
<Route path="/service" element={<Service/>}/>  
<Route path="/confirmed" element={<Servicesucess />} />  
<Route path="/Estimations" element={<Estimations />} /> 
  
</Routes>

<Fouter/>


</BrowserRouter>
       
 
    </div>
  );
}

export default App;
