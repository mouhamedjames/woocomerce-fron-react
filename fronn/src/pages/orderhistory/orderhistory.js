import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import styles from "./OrderHistory.module.scss";

const OrderHistory = () => {
const [Order,setorder] = useState([])
const user= useSelector((state) => state.user.currentUser)


const navigate=useNavigate()


  useEffect(() => {
     const getorder=async()=>{
try {
  const res= await  axios.get("http://localhost:8500/api/order/getorder")
  setorder(res.data) 
console.log(Order)
} catch (error) {
    console.log("poblem")
    
}




     }
     getorder()

  }, []);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = Order.filter((map) => map.useerid === user._id)
  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
         
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
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
                  {filteredOrders.map((order, index) => {
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
                          {"$"}
                          {amount}
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
    </section>
  );
};

export default OrderHistory;
