import React, { useState, useEffect } from 'react';

function App() {
  const [animes, setAnimes] = useState([]);
  const [newAnime, setNewAnime] = useState({
    title: '',
    studio: '',
    release: 0,
  });
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = () => {
    fetch('/animes')
      .then(response => response.json())
      .then(data => setAnimes(data.info))
      .catch(error => console.error('Error fetching animes:', error));
  };

  const handleAddAnime = () => {
    fetch('/animes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnime),
    })
      .then(response => response.json())
      .then(data => {
        setAnimes([...animes, data.info]);
        setNewAnime({
          title: '',
          studio: '',
          release: 0,
        });
      })
      .catch(error => console.error('Error adding anime:', error));
  };

  const handleEditAnime = (animeId) => {
    setSelectedAnimeId(animeId);
    // Pobierz dane o wybranym anime (opcjonalne)
    // ...
  };

  const handleUpdateAnime = () => {
    const updatedAnime = {
      title: newAnime.title,
      studio: newAnime.studio,
      release: newAnime.release,
    };

    fetch(`/animes/${selectedAnimeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnime),
    })
      .then(response => response.json())
      .then(() => {
        fetchAnimes(); // Odśwież listę po zaktualizowaniu
        setSelectedAnimeId(null);
        setNewAnime({
          title: '',
          studio: '',
          release: 0,
        });
      })
      .catch(error => console.error('Error updating anime:', error));
  };

  const handleDeleteAnime = (animeId) => {
    fetch(`/animes/${animeId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setAnimes(animes.filter(anime => anime._id !== animeId));
      })
      .catch(error => console.error('Error deleting anime:', error));
  };

  return (
    <div className="App">
      <h1>Baza danych anime</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newAnime.title}
          onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Studio"
          value={newAnime.studio}
          onChange={(e) => setNewAnime({ ...newAnime, studio: e.target.value })}
        />
        <input
          type="number"
          placeholder="Release Year"
          value={newAnime.release}
          onChange={(e) => setNewAnime({ ...newAnime, release: e.target.value })}
        />
        {selectedAnimeId ? (
          <button onClick={handleUpdateAnime}>Update Anime</button>
        ) : (
          <button onClick={handleAddAnime}>Add Anime</button>
        )}
      </div>

      <ul>
        {animes.map((anime) => (
          <li key={anime._id}>
            {anime.title} - {anime.studio} ({anime.release})
            <button onClick={() => handleEditAnime(anime._id)}>Edit</button>
            <button onClick={() => handleDeleteAnime(anime._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
