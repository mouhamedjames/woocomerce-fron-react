import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Notiflix from "notiflix";


import styles from "./Client.module.scss";

const Clients= () => {


const [Client, setClient]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
const  get=async()=>{
 
try{
const  res= await axios.get("http://localhost:8500/api/user/get")  
setClient(res.data)
console.log(Client)
}
catch{
  console.log("erroe")
}
}
get()
  }, []);


  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id) => {
    try {
      
     const  res =await axios.delete("http://localhost:8500/api/user/delete/"+id)
   
     toast.success("Product deleted successfully.");
      window.location.reload();
     

    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <>
      <div className={styles.order}>
        <h2>ALL  USER </h2>
        <p>
          Open an user to <b>Check  all detaills </b>
        </p>
        <br />
        <>
       
          <div className={styles.table}>
            {Client.length === 0 ? (
              <p>No user found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    
                    <th>USER ID</th>
                    <th>USER  Name </th>
                    <th>USER Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Client.map((Cls, index) => {
                    const {
                      _id,
                 
                      username,
                      email,phone
                    } = Cls;
                    return (
                      <tr key={_id} >
                        <td>{index + 1}</td>
                       
                        <td>{_id}</td>
                        <td>
                      
                          {username}
                        </td>
                        <td>
                        {email}
                        
                        </td>
                        <td>
                        {phone}
                        
                        </td>

                        <td className={styles.icons}>
                    
                 
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(_id)}
                      />
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

export default Clients;
