import React, { useState } from 'react';
import './App.css'; // behåll om du vill styling

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Funktion för att validera ett fält
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (value.trim().length < 2) {
        error = 'Namnet måste vara minst 2 tecken långt';
      }
    } else if (name === 'email') {
      if (!value.includes('@')) {
        error = 'E-post måste innehålla @';
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        error = 'Lösenordet måste vara minst 8 tecken långt';
      }
    }

    return error;
  };

  // Hantera förändring i input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Uppdatera formulärdata
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validera och uppdatera error för just det fältet
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div className="form-container">
      <h1>Registrera dig</h1>

      <form>
        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" disabled>
          Registrera (kommer senare)
        </button>
      </form>
    </div>
  );
}

export default App;