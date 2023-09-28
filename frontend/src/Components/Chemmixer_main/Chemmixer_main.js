import React from 'react'
import  "./Chemmixer_main.css"
import Display from '../Display/Display'
import Display_application from '../Display_application/Display_application'
import Periodic_table from '../Periodic_table/Periodic_table'

export default function Chemmixer_main() {
  return (
    <div className='chemmixer_main'>
        <div className='display'>
            <Display/>
            <Display_application/>
        </div>
        <div className='periodic'>
            <Periodic_table/>
        </div>
    </div>
  )
}
