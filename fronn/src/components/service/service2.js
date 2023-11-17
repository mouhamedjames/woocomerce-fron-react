import React, { useState } from 'react';
import './service.scss';
import { useNavigate } from "react-router-dom";
import  axios from "axios"
import { useSelector } from "react-redux";
const CheckboxForm = () => {



  const cat="tac"
  const navigate = useNavigate();
  const user= useSelector((state) => state.user.currentUser)
  const [place,setPlace]=useState('')
  const [time,setTime]=useState('')
  const [checkboxValues, setCheckboxValues] = useState({

    cafardgermanique: false,
    cafardamericain: false,
    ssAnswer: false
  });
  const [checkboxValues1, setCheckboxValues1] = useState({

    interregards: false,
    Traitementinterbatiment: false,
    
  });
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
  <h2>Decafarisation</h2>
    <div className="styled-input-container">
    
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example1"
            type="checkbox"
            name="cafardgermanique"
            checked={checkboxValues.cafardgermanique}
            onChange={handleCheckboxChange}
          />
          
        <label className="ls" for="checkbox-example1">Cafard Germanique</label>
      </div>
      
      <div className="styled-input-single">
      <input name="fieldset-5" id="checkbox-example2"
            type="checkbox"
            name="cafardamericain"
            checked={checkboxValues.cafardamericain}
            onChange={handleCheckboxChange}
          />
        <label for="checkbox-example2">Cafard Americain
        </label>
      </div>
      <div className="ls" className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example3"
            type="checkbox"
            name="ssAnswer"
            checked={checkboxValues.ssAnswer}
            onChange={handleCheckboxChange}
            value="" 
          />
        <label className="ls" for="checkbox-example3">sans answer</label>
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
      name="fieldset-5" id="checkbox-example4"
            type="checkbox"
            name="Traitementinterbatiment"
            checked={checkboxValues1.Traitementinterbatiment}
            onChange={handleCheckboxChange1}
          />
          
        <label  className="ls" for="checkbox-example4">Traitement inter batiment</label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example5"
            type="checkbox"
            name="interregards"
            checked={checkboxValues1.interregards}
            onChange={handleCheckboxChange1}
          />
        <label className="ls" for="checkbox-example5">inter regards</label>
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
      name="fieldset-5" id="checkbox-example6"
            type="checkbox"
            name="Cafard"
            checked={checkboxValues2.Cafard}
            onChange={handleCheckboxChange2}
          />
          
        <label className="ls" for="checkbox-example6">Cafard</label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example7"
            type="checkbox"
            name="Souris"
            checked={checkboxValues2.Souris}
            onChange={handleCheckboxChange2}
          />
        <label className="ls" for="checkbox-example7">Souris</label>
      </div>
      <div className="styled-input-single">
      <input name="fieldset-5" id="checkbox-example8"
            type="checkbox"
            name="Fourmis"
            checked={checkboxValues2.Fourmis}
            onChange={handleCheckboxChange2}
          />
        <label className="ls" for="checkbox-example8">Fourmis
        </label>
      </div>
      <div className="styled-input-single">
      <input
      name="fieldset-5" id="checkbox-example9"
            type="checkbox"
            name="termites"
            checked={checkboxValues2.termites}
            onChange={handleCheckboxChange2}
       
          />
        <label className="ls" for="checkbox-example9">termites</label>
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
