import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, RotateCw, Compass } from 'lucide-react';

const GRID_SIZE = 5;
const DIRECTIONS = ['N', 'E', 'S', 'W'];

const DirectionArrow = ({ direction }) => {
  switch (direction) {
    case 'N': return <ArrowUp />;
    case 'E': return <ArrowRight />;
    case 'S': return <ArrowDown />;
    case 'W': return <ArrowLeft />;
    default: return null;
  }
};

const Robot = ({ x, y, direction }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        left: `${x * 20}%`,
        top: `${y * 20}%`,
        width: '48px',
        height: '48px',
        backgroundColor: '#587D71',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <DirectionArrow direction={direction} style={{ color: 'white' }} size={24} />
    </div>
  );
};

const Grid = ({ children }) => (
  <div style={{
    position: 'relative',
    width: '320px',
    height: '320px',
    backgroundColor: '#FFFBF0',
    border: '2px solid #587D71',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)'
  }}>
    {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => (
      <div key={i} style={{ border: '1px solid #587D71', opacity: 0.3 }} />
    ))}
    {children}
  </div>
);

const Button = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      backgroundColor: '#587D71',
      color: '#FFFBF0',
      fontWeight: 'bold',
      padding: '8px',
      borderRadius: '4px',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }}
  >
    {children}
  </button>
);

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 4, direction: 'N' });

  const moveForward = () => {
    setPosition(prev => {
      const newPos = { ...prev };
      switch (prev.direction) {
        case 'N': newPos.y = Math.max(0, prev.y - 1); break;
        case 'E': newPos.x = Math.min(GRID_SIZE - 1, prev.x + 1); break;
        case 'S': newPos.y = Math.min(GRID_SIZE - 1, prev.y + 1); break;
        case 'W': newPos.x = Math.max(0, prev.x - 1); break;
        default: 
          console.warn(`Unexpected direction: ${prev.direction}`);
          break;
      }
      return newPos;
    });
  };

  const rotate = (clockwise) => {
    setPosition(prev => {
      const currentIndex = DIRECTIONS.indexOf(prev.direction);
      const newIndex = (currentIndex + (clockwise ? 1 : -1) + 4) % 4;
      return { ...prev, direction: DIRECTIONS[newIndex] };
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F2E8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '16px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', color: '#587D71' }}>
        Bellroy Robot Control
      </h1>
      <Grid>
        <Robot {...position} />
      </Grid>
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <Button onClick={moveForward}>Move Forward</Button>
        <Button onClick={() => rotate(false)}><RotateCcw size={18} /></Button>
        <Button onClick={() => rotate(true)}><RotateCw size={18} /></Button>
      </div>
      <p style={{ marginTop: '16px', color: '#587D71', display: 'flex', alignItems: 'center' }}>
        <Compass style={{ marginRight: '8px' }} /> 
        Position: ({position.x}, {position.y}) Facing: {position.direction}
      </p>
      <div style={{ marginTop: '16px', border: '1px solid #587D71', padding: '8px' }}>
        <h2>Debug Info:</h2>
        <p>Grid Size: {GRID_SIZE}x{GRID_SIZE}</p>
        <p>Robot Position: ({position.x}, {position.y})</p>
        <p>Robot Direction: {position.direction}</p>
      </div>
    </div>
  );
};

export default App;