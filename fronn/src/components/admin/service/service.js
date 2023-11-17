import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"



import styles from "./service.module.scss";

const Service = () => {


const [services, setservices]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
const  get=async()=>{

try{
const  res= await axios.get("http://localhost:8500/api/service/getservice")  
setservices(res.data)
}
catch{
  console.log("erroe")
}
}
get()
  }, []);

  const handleClick = (_id) => {
    navigate(`/admin/service-details/${_id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>Service History</h2>
        <p>
          Open an service requests to <b>answer service requests</b>
        </p>
        <br />
        <>
       
          <div className={styles.table}>
            {services.length === 0 ? (
              <p>No service found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>service ID</th>
                    
                    <th>service Status</th>
                    <th>Client Reponse</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => {
                    const {
                      _id,
                      updatedAt,
                    
                      status,
                      accpet
                    } = service;
                    return (
                      <tr key={_id} onClick={() => handleClick(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {updatedAt}
                        </td>
                        <td>{_id}</td>
                       
                        <td>
                          <p
                            className={
                              status !== "answered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {status}
                          </p>
                        </td>
                        <td>
                          <p
                            className={
                              status !== "accepted"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {accpet}
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

export default Service;
