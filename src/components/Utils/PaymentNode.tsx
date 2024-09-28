import { Handle, Position } from '@xyflow/react';
import React from 'react'

const PaymentNode = ({ data, id}: any) => {
    
  return (
    <div className='paymentNode'>
        <Handle type='target' position={Position.Left}/>
        {data?.value}
    </div>
  )
}

export default PaymentNode