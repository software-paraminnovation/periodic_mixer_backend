

import React, { useEffect } from 'react';
import './Display_application.css';
import { useState } from 'react';
import { useCustomContext } from '../../Context/Context';
import CancelIcon from '../../images/Cancel_Icon.svg';

export default function Display_application() {
  const { value, setValue } = useCustomContext();
  const [selectedCompound, setSelectedCompound] = useState(0);
  const initial_display = ["Compound1", "Compound2", "Compound3"];

  // Destructure value object
  const { generated_answer, flag } = value;



  const keys = Object.keys(generated_answer);
  const values = Object.values(generated_answer);
  
   
  // Handle flag changes
 
  // Function to set application display
  const setApplicationDisplay = (application, index) => {
    if (application) {
      setValue((prevValue) => ({
        ...prevValue,
        application_display: application,
      }));
      setSelectedCompound(index);
    }
  };

  // Generate paragraphs
  useEffect(() => {
    if (values[0]) {
  
      setApplicationDisplay(values[1], 0);
    }
  }, [values[0]]);

  const paragraphs = value.application_display.map((content, index) => (
    <>
      {content=="*Uncover compound applications from element mixing!*"? (<div key={index} className='display_initial_content'><p key={index}>{content}</p></div>):content=="***Processing data***"? (<div key={index} className='display_initial_content'><p key={index}>{content}</p></div>):<li key={index}>{content}</li>}
    </>
   
  ));
 

  // Render compounds dynamically
  const compoundElements =initial_display.map((compoundLabel, index) => (
    <div
      key={index}
      className={`compound_box compound_box_spl ${
        selectedCompound === index ? 'selected' : 'default'
      }`}
      onClick={() => setApplicationDisplay(values[index+1], index)}
    >
      {keys[index+1] ? keys[index+1] : compoundLabel}
    </div>
  ));
   
 


  return (
    <div className='display_application'>
      <div className='compound'>{compoundElements}</div>
      <div className='compound_display'>
        <div className='compound_display_inner1'>
    
          <div className='compound_display_inner'>{paragraphs
        
          }</div>
        </div>
      </div>
    </div>
  );
}

