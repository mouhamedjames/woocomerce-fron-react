import React ,{useState}from 'react'
import { Link, useNavigate,NavLink } from "react-router-dom";
import axios from 'axios'

export const Devis = ({id,idservice}) => {
const [description,setdes]= useState('')
const [amount,setamout]= useState("0")
const navigate=useNavigate()

const acceptoffer=async(e) =>{
  e.preventDefault()
try{

const devi= await axios.post("http://localhost:8500/api/devi/creatdevis", { iduser:id,description:description,total:amount ,idservice:idservice })
const res= await  axios.put("http://localhost:8500/api/service//updateservice/"+idservice,{status:"Answred"})
navigate("/admin/service")

}
catch(error){

  console.log(error.response.data)


}



}



    
    return (
        <div>
           <h3>Estimation</h3>
   <h3>Service Inventory</h3>
 
<form>


    <div class="quote-item">
      <span>Service Description:</span>
      <textarea
        id="description"
        name="description"
        rows="5"
        placeholder="Enter your description here"
       
        onChange={(e)=>setdes(e.target.value)}
        required
      ></textarea>
    </div>
    <div class="quote-item">
      <span>Montant hors taxe:</span>
      <input id="amount" type="number"  onChange={(e)=>setamout(e.target.value)} />
    </div>
    <div class="quote-item">
      <span>Taxe (19%):</span>
      <p>{amount*19/100}</p>
    </div>
    <div class="quote-item">
      <span>Total:</span>
     <p>{(parseFloat(amount)+parseFloat((amount*19/100)))}</p>
    </div>
<div>
<button  name="accept" onClick={acceptoffer} >Answer Service</button>
    
    </div>
    </form>
        </div>
    )
}
export default  Devis