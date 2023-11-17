import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import styles from "./OrderHistory.module.scss";

const OrderHistory = () => {
    
const [devi,setdevi] = useState([])


const user= useSelector((state) => state.user.currentUser)


const navigate=useNavigate()


  useEffect(() => {
     const getorder=async()=>{
try {
  const res= await  axios.get("http://localhost:8500/api/devi/getdevis")
  setdevi(res.data) 
 

} catch (error) {
    console.log(error.response.data)
    
}




     }
     getorder()

  }, []);

  const handleClick = async(idservice,iddevis) => {
      try{
const res= await axios.put("http://localhost:8500/api/service/updateservice/"+idservice,{accpet:"accepted"})
const res1 =await axios.put("http://localhost:8500/api/devi/updatedevis/"+iddevis,{reponse:"true"})
console.log("hi")
      }
      catch(error){

      }
   
  };

  const filteredOrders = devi.filter((map) => map.iduser === user._id)
  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Estimation History</h2>
       
        <br />
        <>
         
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>No Estimation  found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>

                    <th>Estimation ID</th>
                    <th>Description</th>
                    <th>AMOUNT  INCLUED TAX</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      _id,
                     
                      description,total,
                      idservice,
                      reponse
                    } = order;
                    return (
                      <tr key={_id} >
                        <td>{index + 1}</td>
                        <td>
                          {_id} 
                        </td>
                        <td >{description}</td>
                        <td>
                          
                          {total}
                          {"TND"}
                        </td>
                        <td>{ reponse ? <p>accepted</p>:<div>
                            <button onClick={ ()=>handleClick(idservice,_id)}>accept</button>
                        <button onClick={ ()=>handleClick(idservice)} >decline</button>
                        </div>}
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
