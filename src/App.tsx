import { useCallback } from 'react';
import './App.css';
import { addEdge, Background, Connection, Controls, Edge, Node, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SelectDropdown from './components/Utils/SelectDropdown';
import PaymentNode from './components/Utils/PaymentNode';
import PaymentInitialize from './components/Utils/PaymentInitialize';
import CustomEdge from './components/Utils/CustomEdge';
import ControlBar from './components/ControlBar';

const initialNodes: Node[] = [
  {
    id: 'in-1',
    type: 'paymentInit',
    position: {x: 175, y: 20},
    data: {},
    draggable: false
  },
  {
    id: 'no-0',
    type: 'paymentInitialize',
    position: {x: 0, y: 200},
    data: {value: 'Start'}
  }
]

const nodesType = {

  // SelectDropdown - Component for allowing user to select Payment Provider
  'paymentInit' : SelectDropdown,

  // PaymentNode - Component for Rendering added Payment Provider Node to Canvas
  'paymentNode' : PaymentNode,

  // PaymentInitialize - Component for Rendering starting Node from where user can connect edges to Payment Provider Nodes
  'paymentInitialize' : PaymentInitialize,
}

const initialEdges: Edge [] = []

// CustomEdge - Component for adding a delete button to edges to remove them
const edgeTypes = {
  'custom-edge': CustomEdge
}

function App() {

  // Getting Saved data from LocalStorage to render preedited flow in UI
  const savedData = localStorage.getItem('savedData');
  const isLocalDataExists = savedData ? JSON.parse(savedData) : null;
  
  const [nodes, setNodes, onNodesChange] = useNodesState(isLocalDataExists !== null ? [...initialNodes, ...isLocalDataExists?.n] : initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(isLocalDataExists !== null ? [...initialEdges, ...isLocalDataExists?.e] : initialEdges)

  // onConnect - Function trigger then user connect a edge from 'paymentInitialize' node to 'Payment Provider' Node
  const onConnect = useCallback((connection: Connection) => {
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const edge: Edge = {...connection, animated: true, id: `${generateId()}`, type: 'custom-edge'}

    setEdges((prevEdge): any => addEdge(edge, prevEdge))
  },[edges]) 

  return (
    <div className="App">
      <div className="container">

        {/* Custom Component for Buttons -> Save Data, Export to Excel, Clear Saved Data */}
        <ControlBar edges={edges} nodes={nodes}/>
        <ReactFlow 
          nodes={nodes}
          nodeTypes={nodesType}
          edges={edges}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // fitView
        >
          <Background />

          {/* Component for Zoom in and Out Functionality */}
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;