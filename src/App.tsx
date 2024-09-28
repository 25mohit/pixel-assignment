import { useCallback, useState } from 'react';
import './App.css';
import { addEdge, Background, Connection, Controls, Edge, Node, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SelectDropdown from './components/Utils/SelectDropdown';
import PaymentNode from './components/Utils/PaymentNode';
import PaymentInitialize from './components/Utils/PaymentInitialize';

const initialNodes: Node[] = [
  {
    id: 'in-1',
    type: 'paymentInit',
    position: {x: 0, y: 0},
    data: {}
  },
  {
    id: 'no-0',
    type: 'paymentInitialize',
    position: {x: 0, y: 150},
    data: {value: 'Start'}
  },
  {
    id: 'no-1',
    type: 'paymentNode',
    position: {x: 0, y: 0},
    data: {}
  }
]

const nodesType = {
  'paymentInit' : SelectDropdown,
  'paymentNode' : PaymentNode,
  'paymentInitialize' : PaymentInitialize,
}

const initialEdges:[] = []

function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  console.log("nodes", nodes);
  const onConnect = useCallback((connection: Connection) => {
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const edge: Edge = {...connection, animated: true, id: `${generateId()}`, type: 'custom-edge'}

    setEdges((prevEdge): any => addEdge(edge, prevEdge))
  },[]) 

  return (
    <div className="App">
      <div className="container">
        <ReactFlow 
          nodes={nodes}
          nodeTypes={nodesType}
          edges={edges}
          // edgeTypes={}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;