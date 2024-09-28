import React, { useState } from 'react'

const ControlBar = ({ edges, nodes }: any) => {
    
    const [isDataExists, setIsDataExists] = useState(localStorage.getItem('savedData'))
    
    const onSaveHandler = () => {
        localStorage.setItem("savedData", JSON.stringify({e: edges, n: nodes}))
    }    

  return (
    <div className='control-bar'>
        <button className='btn primary' onClick={onSaveHandler}>Save Flow</button>
        { isDataExists !== null && <button className='btn danger'>Clear Saved Data</button> }
    </div>
  )
}

export default ControlBar