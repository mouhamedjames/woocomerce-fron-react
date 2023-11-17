
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import styles from "./ProductItem.module.scss";
  import { ADD_TO_CART,CALCULATE_TOTAL_QUANTITY } from "../../redux/productredux.js";
  import { useDispatch } from "react-redux";
  import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  const Product = ({ item }) => {
const [testqa ,settestqa ]=useState(true)
useEffect(() => {
if (item.nquntity<1){
  settestqa(false)

}},[])
    const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
const quantity=1
  const addToCart = () => {
    dispatch(ADD_TO_CART({...item,quantity}));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
    return (
      <div className={styles.card}>
      
      <Link to={`/product/${item._id}`}>
        <div className={styles.img}>
          <img src={item.imageurl} alt={item.name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`${item.price}TND`}</p>
          <h4>{shortenText(item.name, 18)}</h4>
        </div>
 
        <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
 {testqa ?<div>
        <button
          className="--btn --btn-danger"
          onClick={addToCart}
        >
          Add To Cart
        </button>
        </div>

      :<div>

       OUT OF STOCK
       </div>
      }
      </div>
    </div>
   
  );
};
  
  export default Product;
  