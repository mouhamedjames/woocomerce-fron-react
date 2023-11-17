import React, { useEffect, useState } from "react";

import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
import axios from "axios"

const OrderDetails = () => {
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

  return (
    <>
      <div className={styles.table}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
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
            <p>
              <b>Shipping Address</b>
              <br />
              Address: {order.address.line1},
              {order.address.line2}, {order.address.city}
              <br />
              
              <br />
              Country: {order.address.country}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
