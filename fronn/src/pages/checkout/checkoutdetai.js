import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import{selectCartItems,
selectCartTotalAmount,
CLEAR_CART,
selectCartTotalQuantity,
} from "../../redux/productredux.js";
import CheckoutSummary from "../../components/checkeoutsummary/checkersummary.js";

import styles from "./CheckoutDetails.module.scss";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
 
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const userss= useSelector((state) => state.user.currentUser)
  const navigate = useNavigate();

  const total=parseFloat(totalAmount.toFixed(2)*0.19)+parseFloat(totalAmount.toFixed(2))
const dispatch=useDispatch()
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
   if (userss===null){
    navigate("/login");
   }
  else{
    try {

await axios.post("http://localhost:8500/api/order/createorder", {useerid:userss._id,products:cartItems,amount:total,address:shippingAddress  });

 dispatch(CLEAR_CART());    
 navigate("/success");

}
   catch(error)
{
  console.error(error);
console.log(userss)


   } }
    
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <div cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* COUNTRY INPUT */}
              
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </div>
           
            
          </div>
          <div className={styles.card} >
            <div cardClass={styles.card}>
              <CheckoutSummary />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
