import React from 'react'
import './Display.css'
import { useCustomContext } from '../../Context/Context'

export default function Display() {
    
    const { value, setValue } = useCustomContext();


    function Mix_function() {
       

        setValue((prevValue) => ({
            ...prevValue,
            flag: true,
            application_display:["***Processing data***"],
            display_message: "Choose elements to mix…"
        }));
    }


    function Clear_function() {
        setValue((prevValue) => ({
            ...prevValue,
            flag: false,
            display_message: "Choose elements to mix…",
            query: [],
            generated_answer: "",

            application_display: ["*Uncover compound applications from element mixing!*"],
            colors:[]

        }));
    }

    function removeColor(index) {
        const newColors = value.colors.filter((_, i) => i !== index);
   
        const newQuery = value.query.filter((_, i) => i !== index);
         // Set the color to an empty string to remove it
        setValue((prevValue) => ({
          ...prevValue,
          colors: newColors,
          query:newQuery
        }));
      }

   
    return (
        <div className='display_box'>
            <div className='display_box_inner'>
                <div className='cross'>
                    <div className='cancelIcon' onClick={() => removeColor(0)}>

                    </div>
                    <div className='cancelIcon' onClick={() => removeColor(1)}></div>
                    <div className='cancelIcon' onClick={() => removeColor(2)}></div>
                    <div className='cancelIcon' onClick={() => removeColor(3)}></div>
                </div>
                <div className='elements'>
                    <div className='box' style={{ backgroundColor: value.colors[0]}}>{value.query ? value.query[0] : ""}</div>
                    <div className='box' style={{ backgroundColor: value.colors[1]}}>{value.query ? value.query[1] : ""}</div>
                    <div className='box' style={{ backgroundColor: value.colors[2]}}>{value.query ? value.query[2] : ""}</div>
                    <div className='box'style={{ backgroundColor: value.colors[3]}}>{value.query ? value.query[3] : ""}</div>
                </div>
                <div className='display_msg'>
                    {value.display_message}
                </div>
            </div>
            <div className='buttons'>
                <button className='Mix' onClick={Mix_function} onTouchStart={Mix_function}>Mix</button>
                <button className='Reset' onClick={Clear_function} onTouchStart={Clear_function}>Reset</button>
            </div>


        </div>
    )
}
