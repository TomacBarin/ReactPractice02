import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1); 

  return (
    <div>
      <h1>Fisklimpa numero {count}</h1>
      <input 
      type="number"
      value={step}
      onChange={(event) => setStep(Number(event.target.value))}
      />
      <button onClick={() => setCount(prev => prev + step)}>Öka</button>
      <button onClick={() => setCount(prev => prev - step)}>Minska</button>
      <button onClick={() => setCount(0)}>Nollställ</button>
      {/* Räknaren */}
    </div>
    
  )
}

export default App;