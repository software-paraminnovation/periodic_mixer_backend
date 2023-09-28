
import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import { CustomProvider } from './Context/Context';
import Chemmixer from './Components/Chem_mixer/Chemmixer';

function App() {
  return (
    <CustomProvider>
      <Chemmixer/>
    </CustomProvider>
   

  );
}

export default App;
