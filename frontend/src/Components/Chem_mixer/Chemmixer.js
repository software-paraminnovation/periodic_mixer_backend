

import React, { useEffect } from 'react';
import { useCustomContext } from '../../Context/Context';
import axios from 'axios';
import './Chemmixer.css';
import Chemmixer_main from '../Chemmixer_main/Chemmixer_main';

export default function Chemmixer() {
  const { value, setValue } = useCustomContext();

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:1800/api/v1/openai/${value.query}`);
  
    if(response.data.message){
      try {
      
        const jsonObject = JSON.parse(response.data.message);
        setValue({ ...value, generated_answer: jsonObject, flag: false });
      } catch (error) {
        console.error('Error fetching data:');
      }
    }
  
  };

  useEffect(() => {
    if (value.flag) {
      fetchData();
    }
  }, [value.flag, value.query, setValue]);

  return (
    <div className='Chemmixer'>
      <Chemmixer_main />
    </div>
  );
}

