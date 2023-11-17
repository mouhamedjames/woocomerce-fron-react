import React, { useEffect ,useState} from "react";
import spinnerImg from "../../assets/spinner.jpg";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
const OrderHistory = () => {
const [order,setorder] = useState([])


const { id } = useParams();


  useEffect(() => {
     const getorder = async () =>{
try {
  const res= await  axios.get("http://localhost:8500/api/order/getonorer/"+id)
  setorder(res.data) 
  console.log(res.data)
} catch (error) {
    console.log("poblem")
    
}




     }
     getorder()

  }, [id]);

  console.log(order)
  return (

      <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {order.length === 0 ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order._id}
            </p>
            <p>
              <b>Order Amount</b> ${order.amount}
            </p>
            <p>
              <b>Order Status</b> {order.status}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((cart, index) => {
                  const { _id, name, price, imageURL, carquantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{carquantity}</td>
                      <td>{(price * carquantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        
                      </td>
                      <td>{_id}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
   
    </section>
  );
};

export default OrderHistory;
