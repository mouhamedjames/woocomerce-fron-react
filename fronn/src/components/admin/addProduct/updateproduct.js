import React,{useState,useEffect} from "react";

import FormData from 'form-data'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import Card from "../../card/Card";

import styles from "./AddProduct.module.scss";

const categories = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  
];

const initialState = {
  name: "",
  price: 0,
  category: "",
  brand: "",
  detaills: "",
  nquntity:1,
};

const UpdateProduct = () => {
  const { id } = useParams();
  const [getproductss, setgetProductss] = useState({});
  

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({initialState})
  const [imageURL,setimageURL]= useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:8500/api/produit/filtergetprduit/" + id);
        setgetProductss(res.data);

          } catch {}
    };
    getProduct();

  }, [id]);
  const handleImageChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };





  const  uploadimage =async(e)=>{

    if (!file) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
        formData.append("fileName", fileName);

   
        console.log(file)


try{
  const res= await axios.post("http://localhost:8500/upload",formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  setimageURL(res.data.imageUrl)
}
catch(error)
{
  console.log(error.response.data)
}


  }
  const addProduct = async(e) => {
    e.preventDefault();

    try {

      const res =await axios.post("http://localhost:8500/api/produit/createproduct",{imageurl:imageURL,detaill:product.detaill,category:product.category,name:product.name,price:product.price,nquntity:product.nquntity})
      
      

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
     
      toast.error(error.message);
    }
  };

  

  return (
    <>
   
      <div className={styles.product}>
        <h2 >Update Product</h2>
        <Card cardClass={styles.card}>
          <form >
            <label>Product name:</label>
            <input
              type="text"
              placeholder={getproductss.name}
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              

              <input
                type="file"
        
                placeholder="Product Image"
                name="image"
                accept="image/*"
                className={styles.puts}
                onChange={(e) => handleImageChange(e)}
              />
              <button type="button" onClick={uploadimage}>Upload</button>
              
            </Card>

            <label>Product price:</label>
            <input
              type="number"
              placeholder={getproductss.price}
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>quantity:</label>
            <input
              type="number"
              placeholder={getproductss.nquntity}
              required
              name="nquntity"
              value={product.nquntity}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category:</label>
            <select
              required
              name={getproductss.category}
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

         

            <label>Product Description</label>
            <textarea
            
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            >{getproductss.detaill}</textarea>
<p>{getproductss.detaill}</p>
            <button className="--btn --btn-primary" onClick={addProduct}>
           Update Product
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UpdateProduct;
