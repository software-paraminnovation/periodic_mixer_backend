
import './App.css';

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
