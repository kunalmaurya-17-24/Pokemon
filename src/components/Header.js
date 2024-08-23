import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css'; // Optional, if you want to add styles for the header

function Header() {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    // Fetch Pokémon data
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        const randomPokemon = response.data.results[randomIndex];
        return axios.get(randomPokemon.url);
      })
      .then(result => {
        setLogo(result.data.sprites.front_default);
      })
      .catch(error => console.error("Error fetching Pokémon:", error));
  }, []);

  return (
    <header className="header">
      <img src={logo} alt="Random Pokémon" className="logo" />
      <h1>Pokemon</h1>
      <img src={logo} alt="Random Pokémon" className="logo" />
    </header>
  );
}

export default Header;
