import { useState } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from 'xlsx';
import { formattedDate } from './Fucntions/Common';

const ControlBar = ({ edges, nodes }: any) => {
    
    const [isDataExists, setIsDataExists] = useState(localStorage.getItem('savedData'))
    const [error, setError] = useState('')

    const onSaveHandler = () => {
        localStorage.setItem("savedData", JSON.stringify({e: edges, n: nodes}))
    }    

    const onClearHandler = () => {
        localStorage.removeItem('savedData')
    }
    
    const exportToExcel = () => {

      const nodesData = nodes?.map((d: any)=> {
        
        if (d?.data && d?.data?.key !== undefined && d?.data?.value !== undefined) {
          return {
            'Id': d?.id,
            'Node Type': d?.type,
            'Code': d.data.key,
            'Payment Provider': d.data.value,
            'pX': d?.position?.x,
            'pY': d?.position?.y,
          };
        }
        return null
      }).filter(Boolean)

      console.log("nodesData", nodesData);

      if(nodesData?.length){    
        setError('')    
        const worksheet = XLSX.utils.json_to_sheet(nodesData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        XLSX.writeFile(workbook, `ReactFlow-${formattedDate}.xlsx`);
      } else {
        setError("Please Add some Nodes before Exporting")
      }
    };
  return (
    <div className='control-bar'>
        <button className='btn primary' onClick={onSaveHandler}>Save Flow</button>
        { isDataExists !== null && <button className='btn danger' onClick={onClearHandler}>Clear Saved Data</button> }
        <SiMicrosoftexcel onClick={exportToExcel} className='excel'/>
        <p className="error">{error}</p>
    </div>
  )
}

export default ControlBar