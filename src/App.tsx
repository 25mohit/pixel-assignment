import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Background, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SelectDropdown from './components/Utils/SelectDropdown';

const initialNodes = [
  {
    id: 'in-1',
    type: 'paymentInit',
    position: {x: 0, y: 0},
    data: {}
  }
]

const nodesType = {
  'paymentInit' : SelectDropdown
}

function App() {

  const [nodes, setNodes] = useState(initialNodes)

  return (
    <div className="App">
      <div className="container">
        <ReactFlow 
          nodes={nodes}
          nodeTypes={nodesType}
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;