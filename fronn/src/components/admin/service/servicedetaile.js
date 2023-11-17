import React, { useEffect, useState } from "react";

import styles from "./servicedetaillse.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";

import axios from "axios"
import Devis from"./devis.js"
const ServiceDetails = () => {
  const [service,setservice] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const getservice = async () =>{
try {
 const res= await  axios.get("http://localhost:8500/api/service/oneservice/"+id)
 setservice(res.data) 

 
} catch (error) {
   console.log("poblem")
   
}




    }
    getservice()

 }, [id]);

  return (
    <>
      <div className={styles.table}>
        <h2>service Details</h2>
        <div>
          <Link to="/admin/service">&larr; Back To service</Link>
        </div>
        <br />
        {service.length === 0 ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Service ID</b> {service._id}
            </p>
            <p>
            <b>user ID</b>{service.userid}
            </p>
            <p>
              <b>Service Status</b> {service.status}
            </p>
            <p>
              <b>disponibilite</b> {service.date}
            </p>
            <p>
              <b>Endroit a traiter</b> {service.place}
            </p>
            <p>
             
             
              
              <br />
              <b>place for treatment</b> 
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  
                  <th>Traitement inter batiment</th>
                  <th>inter regards</th>
                  
                </tr>
              </thead>
              <tbody>
               
                    <tr >
                      
                   
                      <td>{service.cbox2.interregards.toString()}</td>
                      <td>{service.cbox2.Traitementinterbatiment.toString()}</td>
                  
                    </tr>
                
              </tbody>
            </table>
          </>
        )}
       <Devis id={service.userid} idservice={service._id} />
      </div>
    </>
  );
};

export default ServiceDetails;
