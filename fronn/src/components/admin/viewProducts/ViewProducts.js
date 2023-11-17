
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate,NavLink } from "react-router-dom";
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";






const ViewProducts = () => {
const [products,setProduct]=useState([])



  useEffect(() => {
  const get=async()=>{


   try{
    const res = await axios.get("http://localhost:8500/api/produit/getprduit")
    setProduct(res.data)


   }
   catch{
console.log("erro")

   }}
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
      
     const  res =await axios.delete("http://localhost:8500/api/produit/deleteproduit/"+id)
   
     toast.success("Product deleted successfully.");
      window.location.reload();
     

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
    
      <div className={styles.table}>
        <h2>All Products</h2>

        

       
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { _id, name, price, imageurl, nquntity } = product;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageurl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{ nquntity}</td>
                    
                    <td>{`${price}TND`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/update-product/${_id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
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
        
       
      </div>
    </>
  );
};

export default ViewProducts;
