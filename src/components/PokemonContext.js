import React, { createContext, useEffect, useState } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [caughtPokemon, setCaughtPokemon] = useState([]);

    useEffect(() => {
        const savedPokemons = JSON.parse(localStorage.getItem('caughtPokemons'));
        if (savedPokemons) {
          setCaughtPokemon(savedPokemons);
        }
      }, []);
    
      const catchPokemon = (pokemon) => {
        const isNameUnique = !caughtPokemon.some(p => p.name === pokemon.name);
    
        if (isNameUnique) {
          const updatedPokemons = [...caughtPokemon, pokemon];
          setCaughtPokemon(updatedPokemons);
          localStorage.setItem('caughtPokemons', JSON.stringify(updatedPokemons));
          return true;
        } else {
          console.error(`A Pokemon with the name ${pokemon.name} already exists.`);
          return false;
        }
      };

      const releasePokemon = (pokemonName) => {
        const updatedPokemons = caughtPokemon.filter(
          (pokemon) => pokemon.name !== pokemonName
        );
        setCaughtPokemon(updatedPokemons);
        localStorage.setItem('caughtPokemons', JSON.stringify(updatedPokemons));
      };

    return (
        <PokemonContext.Provider value={{ caughtPokemon, catchPokemon, releasePokemon }}>
            {children}
        </PokemonContext.Provider>
    );
};
