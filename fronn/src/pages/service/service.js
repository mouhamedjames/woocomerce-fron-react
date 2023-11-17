import React, { useEffect, useState } from "react";
import styles from "./service.module.scss"
import { Link } from "react-router-dom";
import Service1 from "../../components/service/service1.js"
import Service2 from "../../components/service/service2.js"
import Service3 from "../../components/service/service3.js"
const categories = [
    { id: 1, name: 'Category 1', image: 'https://www.shutterstock.com/fr/image-vector/spraying-pesticide-insecticide-farmer-holding-sprayer-2092134667', treatment: 'Treatment against mice and rats' },
    { id: 2, name: 'Category 2', image: 'https://www.shutterstock.com/fr/image-vector/spraying-pesticide-insecticide-farmer-holding-sprayer-2092134667', treatment: 'Treatment against cockroaches' },
    { id: 3, name: 'Category 3', image: 'https://www.shutterstock.com/fr/image-vector/spraying-pesticide-insecticide-farmer-holding-sprayer-2092134667', treatment: 'Treatment against insects and others' },
    // Add more categories here
  ];
const Service=()=>{

const [first,setFirst]=useState(false)
const [second,setSecond]=useState(false)
const [third,setthird]=useState(false)
const [close,setclose]=useState(true)


const page=()=>{
  setFirst(false)
  setSecond(false)
  setthird(false)
  setclose(true)

}


const checkpage=(id)=>{
    


if (id===1){
   
    setFirst(true)
    setSecond(false)
    setthird(false)
    setclose(false)
}     
else if (id===2){
    setSecond(true)
    setFirst(false)
    setthird(false)
    setclose(false)
}
else if (id===3){
    setthird(true)
    setFirst(false)
    setSecond(false)
    setclose(false)
}
}
return(

   

      <div>
         <div className={
      close ? `${styles["displays-On"]}` : `${styles["displays-Off"]}`
    }>
    <h1>Choose a Category</h1>
   
    <div className={styles["category-container"]}>
      {categories.map((category) => (
        <div onClick={()=>checkpage(category.id)}>
        <div className={styles["category-item"]} key={category.id}>
          <img src={category.image} alt={category.name} />
          <span>{category.name}</span>
          <p>{category.treatment}</p>
        </div></div>
      ))}
    </div>
    </div>
<div className={
              first ? `${styles["displays-On"]}` : `${styles["displays-Off"]}`
            }>
           <div className={styles.Linkss}>
          <Link onClick={page} >&larr; Back To service</Link>
        </div>
         <Service1/>
            
            
            </div>

<div className={
              second ? `${styles["displays-On"]}` : `${styles["displays-Off"]}`
            }>
<div className={styles.Linkss}>
          <Link  onClick={page}>&larr; Back To service</Link>
        </div>
 <Service2/>
            
            </div>

<div className={
              third ? `${styles["displays-On"]}` : `${styles["displays-Off"]}`
            } >
  <div className={styles.Linkss}>
          <Link  onClick={page}>&larr; Back To service</Link>
        </div>
  <Service3/>
            </div>


  </div>

    
)



}
export default Service