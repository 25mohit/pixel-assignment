import { Node, useReactFlow } from "@xyflow/react"

const options = [
    { key: 'St', value: 'Stripe' },
    { key: 'Ap', value: 'Amazon Pay' },
    { key: 'Gp', value: 'Google Pay' },
    { key: 'Ap', value: 'Apple Pay' },
    { key: 'Pp', value: 'Paypal' },
    { key: 'Up', value: 'UPI' },
]

const SelectDropdown = () => {
    const { setNodes } = useReactFlow()
    const randomNum = Math.random() * 200

    const onChangeHandler = (e: any) => {
        const value = e.target.value?.split('--+--')
        const generateId = () => Math.random().toString(36).substr(2, 9);

        console.log(value);
        
        setNodes((prevNodes) => [...prevNodes, { id: `${generateId()}`, data: {key: value?.[0], value: value?.[1]}, position: {x: randomNum, y: randomNum}, type: 'paymentNode'}])

    }

  return (
    <div className='select'>
        <select name="paymentProvider-select" id="" onChange={onChangeHandler}>
            <option value="">--- Select Payment Provider ---</option>
            {
                options?.map((option, index) => <option key={index} value={`${option?.key}--+--${option?.value}`}>{option?.value}</option>)
            }
        </select>
    </div>
  )
}

export default SelectDropdown