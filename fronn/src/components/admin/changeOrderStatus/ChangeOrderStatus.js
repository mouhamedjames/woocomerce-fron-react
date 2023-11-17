
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../card/Card";
import axios from "axios"

import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const editOrder = async(e, id) => {
    e.preventDefault();
   

 
    try {
      const  res= await axios.put("http://localhost:8500/api/order/update/"+id,{status})
     console.log( res.data)

 
      toast.success("Order status changes successfully");
      navigate("/admin/orders")
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  return (
    <>
  

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form >
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button onClick={(e) => editOrder( e,id)} className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
