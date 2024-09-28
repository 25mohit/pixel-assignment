import { useState } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from 'xlsx';
import { formattedDate } from './Fucntions/Common';

const ControlBar = ({ edges, nodes }: any) => {
    
    const [isDataExists, setIsDataExists] = useState(localStorage.getItem('savedData'))
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    function removeMessage() {
      setTimeout(() => {
        setMessage('')
      },3000)
    }

    const onSaveHandler = () => {
      localStorage.setItem("savedData", JSON.stringify({e: edges, n: nodes}))
      setMessage('Flow Data Saved to LocalStorage')
      removeMessage()
    }    
    
    const onClearHandler = () => {
      localStorage.removeItem('savedData')
      setMessage('Flow Data Removed from LocalStorage')
      removeMessage()
    }
    
    const exportToExcel = () => {

      const nodesData = nodes?.map((d: any)=> {
        
        if (d?.data && d?.data?.key !== undefined && d?.data?.value !== undefined) {
          return {
            'Id': d?.id,
            'Node Type': d?.type,
            'Provider Code': d.data.key,
            'Payment Provider': d.data.value,
            'pX': d?.position?.x,
            'pY': d?.position?.y,
          };
        }
        return null
      }).filter(Boolean)

      if(nodesData?.length){    
        const worksheet = XLSX.utils.json_to_sheet(nodesData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        XLSX.writeFile(workbook, `ReactFlow-${formattedDate}.xlsx`);
      } else {
        setError("Please Add some Nodes before Exporting")
        setTimeout(() => {
          setError('')
        },3000)
      }
    };
  return (
    <div className='control-bar'>
        <button className='btn primary' onClick={onSaveHandler}>Save Flow</button>
        { isDataExists !== null && <button className='btn danger' onClick={onClearHandler}>Clear Saved Data</button> }
        <SiMicrosoftexcel onClick={exportToExcel} className='excel'/>
        {error && <p className="error">{error}</p>}
        {message && <p className='message'>{message}</p>}
    </div>
  )
}

export default ControlBar