import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const CustomContext = createContext("");

// Custom provider component
export const CustomProvider = ({ children }) => {
  let initial_display=["Compound1","Compound2","ompound3"]
  const [value, setValue] = useState({ query: [], generated_answer: "",display_message:['Choose elements to mix…'],application_display:["*Uncover compound applications from element mixing!*"],flag:false,colors:[]});
  

  return (
    <CustomContext.Provider value={{ value, setValue }}>
      {children}
    </CustomContext.Provider>
  );
};

// Custom hook to access context values
// export const useCustomContext = () => {
//   const context = useContext(CustomContext);
//   console.log(context,"context")
//   if (!context) {
//     throw new Error('useCustomContext must be used within a CustomProvider');
//   }
//   return context;
// };

export const useCustomContext = () => useContext(CustomContext);