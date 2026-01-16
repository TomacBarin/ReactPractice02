import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Funktion för att hämta data
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Något gick fel vid hämtning av inlägg...');
    } finally {
      setLoading(false);
    }
  };

  // Hämta data när komponenten mountas (första gången)
  useEffect(() => {
    fetchPosts();
  }, []); // Tom array = körs bara vid mount

  // Filtrerade inlägg baserat på sökterm (beräknat från state)
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="posts-container">
      <h1>Blogginlägg från JSONPlaceholder</h1>

      {/* Sökfält */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Sök på titel eller innehåll..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Uppdatera-knapp */}
      <button className="refresh-btn" onClick={fetchPosts} disabled={loading}>
        {loading ? 'Laddar...' : 'Uppdatera inlägg'}
      </button>

      {/* Loading / Error / Innehåll */}
      {loading && <div className="loading">Laddar inlägg...</div>}

      {error && <div className="error-message">Fel: {error}</div>}

      {!loading && !error && (
        <div className="posts-list">
          {filteredPosts.length === 0 ? (
            <p>Inga inlägg matchar din sökning "{searchTerm}"</p>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <small>User ID: {post.userId} | Post ID: {post.id}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;