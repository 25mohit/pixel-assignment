import { Handle, Position, useReactFlow } from '@xyflow/react';
import React from 'react'
import { IoClose } from "react-icons/io5";

const PaymentNode = ({ data, id}: any) => {
    
  const { setNodes } = useReactFlow()

  return (
    <div className='paymentNode'>
        <Handle type='target' position={Position.Left}/>
        {data?.value}
        {/* <span>
          </span> */}
          <IoClose className='icon-close' onClick={() => setNodes((prev): any => prev.filter(d => d.id !== id))}/>
    </div>
  )
}

export default PaymentNode