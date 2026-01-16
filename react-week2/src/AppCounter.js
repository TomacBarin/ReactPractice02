import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1); 

return (
  <div className="counter-container">
    <h1>Fisklimpa numero {count}</h1>

    <label>
      Steg: 
      <input
        type="number"
        value={step}
        onChange={(event) => setStep(Number(event.target.value))}
        className="step-input"
      />
    </label>

    <div className="buttons">
      <button 
        className="increase"
        onClick={() => setCount(prev => prev + step)}
      >
        Öka
      </button>

      <button 
        className="decrease"
        onClick={() => setCount(prev => prev - step)}
      >
        Minska
      </button>

      <button 
        className="reset"
        onClick={() => setCount(0)}
      >
        Nollställ
      </button>
    </div>
  </div>
);
}

export default App;