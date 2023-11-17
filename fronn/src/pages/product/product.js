
  import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { mobile } from "../../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ADD_TO_CART,CALCULATE_TOTAL_QUANTITY } from "../../redux/productredux.js";
import { useDispatch } from "react-redux";
import axios from  "axios"


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
 var a=false
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:8500/api/produit/filtergetprduit/" + id);
        setProduct(res.data);

          } catch {}
    };
    getProduct();

  }, [id]);
  if  (product._id===undefined){

    a=false
    }
     else{
       a=true
     }   
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
        ADD_TO_CART({ ...product, quantity })
    );
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };


  return (
    <section>
      {a ?
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
 
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                 
                    <>
                      <button
                        className="--btn"
                        onClick={() => handleQuantity("dec")}
                      >
                        -
                      </button>
                      <p>
                        <b>{quantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => handleQuantity("inc")}
                      >
                        +
                      </button>
                    </>
               
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={ handleClick }
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
     
       
      </div>
      :<div><p>not found </p></div>}
    </section>
  );
};

export default Product;
