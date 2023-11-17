import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"



import styles from "./Orders.module.scss";

const Orders = () => {


const [orders, setOrder]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
const  get=async()=>{

try{
const  res= await axios.get("http://localhost:8500/api/order/getorder")  
setOrder(res.data)
}
catch{
  console.log("erroe")
}
}
get()
  }, []);

  const handleClick = (_id) => {
    navigate(`/admin/order-details/${_id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>Your Order History</h2>
        <p>
          Open an order to <b>Change order status</b>
        </p>
        <br />
        <>
       
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      _id,
                      updatedAt,
                      amount,
                      status,
                    } = order;
                    return (
                      <tr key={_id} onClick={() => handleClick(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {updatedAt}
                        </td>
                        <td>{_id}</td>
                        <td>
                        
                          {amount}
                          {"TND"}
                        </td>
                        <td>
                          <p
                            className={
                              status !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {status}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
