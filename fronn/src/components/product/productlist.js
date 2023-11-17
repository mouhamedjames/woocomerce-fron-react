
import Pagination from "../pagination/Pagination.js";
import React, { useEffect, useState } from "react";
import axios from "axios"
import styles from "./styles.module.scss"
import Product from "./product.js";


const   Products = ({sort,cat})=>{
const [product,setProduct]=useState([])
const [filteredProducts, setFilteredProducts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [productsPerPage] = useState(8);
const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  

useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8500/api/produit/getprduit" );
        setProduct(res.data);
        console.log(product)
      } catch (err) {}
    };
    getProducts();
  } ,[]);

  useEffect(() => {
  
      setFilteredProducts(product)
  
  }, [product]);
  useEffect(() => {
    console.log(cat)
  if (cat==="all"){

    setFilteredProducts(product)
  }
  else{
    setFilteredProducts(product.filter((map)=>map.category===cat))

    
  }
}, [cat,product]);
  useEffect(() => {
    console.log(sort)
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


    return (
        <section>
        <div className={styles.container}>
        
      
      {filteredProducts
            .slice(indexOfFirstProduct, indexOfLastProduct)
            .map((item) =>
            <div className={styles.product}>
            <Product item={item} key={item.id} />
            </div>)}
           
            
            </div>



    

<Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />

        </section>
      );
    };
    
    export default Products;