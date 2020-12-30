import React from 'react';
import './App.css';

export default () => {
  const [toggle, setToggle] = React.useState(true);
  return (
    <div className="App">
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'Close' : 'Open'}
      </button>
      {toggle && (
        <>
          <h3>React typescript template.</h3>
          <p>Hello, World.</p>
        </>
      )}
    </div>
  )
}