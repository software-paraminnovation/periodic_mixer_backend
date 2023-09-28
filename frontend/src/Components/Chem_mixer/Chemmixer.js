// import React from 'react'
// import { useCustomContext } from '../../Context/Context'
// import axios from 'axios';
// import { useEffect } from 'react';
// import './Chemmixer.css'
// import Chemmixer_main from '../Chemmixer_main/Chemmixer_main';
// export default function Chemmixer() {
//   const {value,setValue}= useCustomContext();
//   // console.log(value,setValue);
//   const canbecalled = async () => {
//     let ASK = ["H20", "H", "O2"];
//     // console.log("hann bhai");
//   let temp;
//     await axios.get(`http://localhost:1800/api/v1/openai/${value.query}`).then(async (response) => {
//       console.log(response.data,"response_data");
//       // console.log("teri maa ");
//       // console.log(response.data.message);
    
//       const jsonObject = JSON.parse(await response.data.message);
//       console.log(jsonObject,"jsonobject")
//       setValue({
//         ...value,
//         generated_answer:jsonObject,
//         flag:false
//       })
//     })
//       .catch(async (err) => {
//         return err;
//         console.log(err);
//       })
//     // console.log(temp,"temp");
//     return temp;

//   }




//   useEffect(() => {
//     // Call the canbecalled function here if needed.
//     canbecalled();
//   }, [value.flag]);

//   return (
//     <div className='Chemmixer'>
//         <Chemmixer_main/>
//     </div>
//   )
// }



import React, { useEffect } from 'react';
import { useCustomContext } from '../../Context/Context';
import axios from 'axios';
import './Chemmixer.css';
import Chemmixer_main from '../Chemmixer_main/Chemmixer_main';

export default function Chemmixer() {
  const { value, setValue } = useCustomContext();

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:1800/api/v1/openai/${value.query}`);
    console.log(response.data,"response data")
    if(response.data.message){
      try {
      
        const jsonObject = JSON.parse(response.data.message);
        setValue({ ...value, generated_answer: jsonObject, flag: false });
      } catch (error) {
        console.error('Error fetching data:', error);
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

