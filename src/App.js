import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Header from './components/Header'; // Import Header component
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch list of Pokémon
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        const fetches = response.data.results.map(pokemon => axios.get(pokemon.url));
        Promise.all(fetches)
          .then(results => {
            setPokemonData(results.map(result => result.data));
            // No need to set the logo here since it's handled in the Header component
          });
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header /> {/* Use Header component with the random logo */}
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="pokemon-grid">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
