import { BezierEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from '@xyflow/react'
import React from 'react'
import { IoClose } from "react-icons/io5";

const CustomEdge = (props: any) => {
    const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props    

    const [edgePath, labelX, labelY] = getBezierPath({sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition})

    console.log("Label Coordinates:", labelX, labelY, "Source Coordinates:", sourceX, sourceY);
    
    const { setEdges } = useReactFlow()
    const offsetX = -300;
    const offsetY = -2;
    
  return (
    <>
        <BezierEdge {...props}/>
        <EdgeLabelRenderer>
            <IoClose onClick={() => setEdges(prevEd => prevEd?.filter(ne => ne?.id !== id))} style={{
                transform: `translate(-50%, -50%) translate(${labelX + offsetX}px, ${labelY + offsetY}px)`,
                position: 'absolute',
                fontSize: '0.9rem',
                pointerEvents: 'all',
                background: 'red',
                color: 'white',
                padding: '1px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
            }} />
        </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge