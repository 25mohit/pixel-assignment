import { Handle, Position } from "@xyflow/react"

const PaymentInitialize = ({ data }: any) => {
  return (
    <div className='pay-initialize' onDragStart={e => e.preventDefault()}>
        <div className="head">Payment Initialied</div>
        <div className="section">
            {data?.value}
        </div>
        <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default PaymentInitialize