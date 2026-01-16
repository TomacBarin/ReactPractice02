import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);          // tid i millisekunder
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);         // array med varvtider

  const intervalRef = useRef(null);             // ref för att hålla interval-ID

  // Formatera tiden till MM:SS:ms
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = (ms % 1000).toString().padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // Hantera start/stop
  const toggleRunning = () => {
    if (isRunning) {
      // Stoppa
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      // Starta
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // uppdatera var 10ms för hyfsad precision
      setIsRunning(true);
    }
  };

  // Återställ allt
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  // Lägg till varv
  const addLap = () => {
    if (!isRunning) return;
    setLaps(prev => [...prev, time]);
  };

  // Cleanup: stoppa intervallet när komponenten unmountas
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // tom dependency → körs bara vid unmount

  return (
    <div className="stopwatch-container">
      <h1>Stoppur</h1>

      <div className="display">
        {formatTime(time)}
      </div>

      <div className="controls">
        <button 
          className={`btn ${isRunning ? 'stop' : 'start'}`}
          onClick={toggleRunning}
        >
          {isRunning ? 'Stopp' : 'Start'}
        </button>

        <button 
          className="btn lap"
          onClick={addLap}
          disabled={!isRunning}
        >
          Varv
        </button>

        <button 
          className="btn reset"
          onClick={reset}
        >
          Återställ
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <h2>Varv</h2>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Varv {index + 1}: <strong>{formatTime(lapTime)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;