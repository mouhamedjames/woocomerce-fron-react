import React, { useEffect,useState } from "react";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillTool } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillContacts } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"

import Chart from "../../chart/Chart.js";
import Chart2 from "../../chart/Chartservice.js";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
const serviceIcon = <AiFillTool size={30} color="green" border-bottom-color="green"/>;
const clientIcon=<AiFillContacts size={30} color="red" border-bottom-color="red"/>;
const Home = () => {
  const [product,setProduct]=useState([])
  const [order,setOrder]=useState([])
  const [client,setclient]=useState([])
  const [service,setservice]=useState([])
  const [attorder,SetAttorder] = useState(0)

 
const  filterss=order.filter((map)=>map.status==="Delivered")


  useEffect(() => {
    
    
    const get=async()=>{
    try{
const res = await axios.get("http://localhost:8500/api/order/getorder")
setOrder(res.data)
const res2 = await axios.get("http://localhost:8500/api/produit/getprduit" )
setProduct(res2.data)
const  res3= await axios.get("http://localhost:8500/api/user/get")  
setclient(res3.data)
const  res4= await axios.get("http://localhost:8500/api/service/getservice")  
setservice(res4.data)

    }
    catch(error){
console.log("il y a une error")

    }}
    get()
    let c =0
for (let i = 0; i < filterss.length; i++) {
   c =c+parseFloat(filterss[i].amount)

}

SetAttorder(c)
    
  }, [filterss.length]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
      {}
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`${attorder}TND`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={product.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={order.length}
          icon={ordersIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"service"}
          count={service.length}
          icon={serviceIcon}
        />
          <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Client"}
          count={client.length}
          icon={clientIcon}
        />
      </div>
      <div className={styles.chart}  >
        <Chart order={order} />
      <br></br>

        <Chart2 service={service}/>
      </div>
      <div>
     
      </div>
    </div>
  );
};

export default Home;
