import React from 'react'
import Data from '../API/Api'
import './Periodic_table.css';
import { useCustomContext } from '../../Context/Context';




export default function Periodic_table() {

  const {value,setValue}= useCustomContext();

  const numRows = 9;
  const numCols = 18;

  const handleElementClick = (symbol,color) => {
   
    // Ensure that value.query stores only up to four elements
    if(value.query.length===0){
      
      setValue((prevValue) => ({
        ...prevValue,
        query: [...prevValue.query, symbol],
        display_message:"Choose elements to mix…",
        colors:[...prevValue.colors,color]
        
      }));
    }
    else if(value.query.length < 3 && value.query.length>0) {
      // Add the symbol to the value.query array
      if(value.query.length===1){
        setValue((prevValue) => ({
          ...prevValue,
          query: [...prevValue.query, symbol],
          display_message:"Choose another element to mix and form a compound!",
          colors:[...prevValue.colors,color]
        }));
      }else{
        setValue((prevValue) => ({
          ...prevValue,
          query: [...prevValue.query, symbol],
          display_message:"Want to add another element? Otherwise, hit ‘Mix’.",
          colors:[...prevValue.colors,color]
        }));
      }
    
    }else if(value.query.length===3){
      setValue((prevValue) => ({
        ...prevValue,
        query: [...prevValue.query, symbol],
        display_message:"Tap to reveal the compound applications ->",
        colors:[...prevValue.colors,color]
      }));
    }
  
  };

  // Generate grid elements dynamically
  const generateGrid = () => {
    const gridElements = [];

    // Loop through rows and columns
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Find an element from your API that matches the current row and column
        const matchedElement = Data.elements.find((element) => {
          return element.row === row && element.col === col;
        });

        // Generate a unique key for each grid element
        const key = `${row}-${col}`;

        // Create a grid item component with a unique key
        const gridItem = (
          <div key={key} className="grid-item">
            {matchedElement ? (
              <div className='chem_element'   style={{
                backgroundColor: `${matchedElement.color}`,
                opacity: ["He", "Ne", "Ar", "Rn", "Og"].includes(matchedElement.symbol) ? 0.7 : 1,
              }}   onClick={() => {
                // Check if the matchedElement is one of the disabled elements
                if (!["He", "Ne", "Ar", "Rn", "Og"].includes(matchedElement.symbol)) {
                  handleElementClick(matchedElement.symbol, matchedElement.color);
                }
              }}>
           
                <p className='right_align'> {matchedElement.number} </p>
                <p className='symbol'>{matchedElement.symbol}</p>
                <p className='element_name'>{matchedElement.name}</p>

              </div>
            ) : (
              ""
            )}
          </div>
        );

        // Add the grid item to the array
        gridElements.push(gridItem);
      }
    }

    return gridElements;
  };

  return (
    <div className='grid'>

      {generateGrid()}





    </div>
  )
}
