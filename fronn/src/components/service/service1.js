import React, { useState } from 'react';
import './service.scss';
import  axios from "axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CheckboxForm = () => {


  const navigate = useNavigate();
  const user= useSelector((state) => state.user.currentUser)


  const [place,setPlace]=useState('')
  const [time,setTime]=useState('')
  const [checkboxValues, setCheckboxValues] = useState({

    mouseTreatment: false,
    ratTreatment: false,
    ssAnswer: false
  });
  const [checkboxValues1, setCheckboxValues1] = useState({

    interregards: false,
    Traitementinterbatiment: false,
    
  });
  const cat="tami"
  const [checkboxValues2, setCheckboxValues2] = useState({

    Cafard: false,
    Souris: false,
    Fourmis: false,
    termites:false
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };
  const handleCheckboxChange1 = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues1((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };
  const handleCheckboxChange2 = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues2((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 if (user !== null){
   try{
const res=await axios.post("http://localhost:8500/api/service/newservice",{userid:user._id,cbox1:checkboxValues,cbox2:checkboxValues1,cbox3:checkboxValues2,place:place,date:time,categorie:cat,status:"Not Answered"})
console.log(res.data)
navigate("/confirmed")
   }
   catch (error){
    console.log("fuck" )
   }

  }
  else
  {

    navigate("/login")
  }}


  return (
    <div className="countainer">








    
      <form onSubmit={handleSubmit}>
     
      <div className="two-column">
  <div className="single-col">
  <h2>Derealization</h2>
    <div className="styled-input-container">
    
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-one"
            type="checkbox"
            name="mouseTreatment"
            checked={checkboxValues.mouseTreatment}
            onChange={handleCheckboxChange}
          />
          
        <label className="ls"for="checkbox-example-one">Mouse Treatment</label>
      </div>
      
      <div className="styled-input-single">
      <input name="fieldset-5" id="checkbox-example-three"
            type="checkbox"
            name="ratTreatment"
            checked={checkboxValues.ratTreatment}
            onChange={handleCheckboxChange}
          />
        <label className="ls" for="checkbox-example-three">Rat Treatment
        </label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-four"
            type="checkbox"
            name="ssAnswer"
            checked={checkboxValues.ssAnswer}
            onChange={handleCheckboxChange}
            value="" 
          />
        <label className="ls"for="checkbox-example-four">sans answer</label>
      </div>
      
    </div>
  </div>
  
  
</div>
<div className="two-column">
  <div className="single-col">
  <h2>place for treatment</h2>
    <div className="styled-input-container">
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-1"
            type="checkbox"
            name="Traitementinterbatiment"
            checked={checkboxValues1.Traitementinterbatiment}
            onChange={handleCheckboxChange1}
          />
          
        <label className="ls" for="checkbox-example-1">Traitement inter batiment</label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-2"
            type="checkbox"
            name="interregards"
            checked={checkboxValues1.interregards}
            onChange={handleCheckboxChange1}
          />
        <label className="ls" for="checkbox-example-2">inter regards</label>
      </div>
      
     
      
    </div>
  </div>
  
  
</div>

<div >
  <div >
  <h2>Vector of demand</h2>
    <div className="styled-input-container">
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-3"
            type="checkbox"
            name="Cafard"
            checked={checkboxValues2.Cafard}
            onChange={handleCheckboxChange2}
          />
          
        <label className="ls" for= "checkbox-example-3">Cafard</label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-4"
            type="checkbox"
            name="Souris"
            checked={checkboxValues2.Souris}
            onChange={handleCheckboxChange2}
          />
        <label className="ls" for="checkbox-example-4">Souris</label>
      </div>
      <div className="styled-input-single">
      <input name="fieldset-5" id="checkbox-example-5"
            type="checkbox"
            name="Fourmis"
            checked={checkboxValues2.Fourmis}
            onChange={handleCheckboxChange2}
          />
        <label className="ls"  for="checkbox-example-5">Fourmis
        </label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example-6"
            type="checkbox"
            name="termites"
            checked={checkboxValues2.termites}
            onChange={handleCheckboxChange2}
       
          />
        <label  className="ls"for="checkbox-example-6">termites</label>
      </div>
      
    </div>
  </div>
  <h2>Endroit a traiter</h2>
  <div className="styled-input-singl">
  <input
              type="text"
              placeholder="Place"
              required
              onChange={(e)=>setPlace(e.target.value)}
              
            />
      
      </div>


 <h2>La disponibilité </h2>
  <div className="styled-input-single">
  <label htmlFor="date">Select a date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          onChange={(e)=>setTime(e.target.value)}
       
          
        />
      
      </div>
  

  
</div>

        <button type="submit" className="--btn --btn-primary --btn-block button">order</button>

      </form>
    </div>
  );
};

export default CheckboxForm;
