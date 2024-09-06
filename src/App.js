import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Pokedex from './containers/Pokedex'
import './App.css';
import AppNavigator from './components/AppNavigator'
import PokemonDetails from './containers/PokemonDetails'
import { PokemonProvider } from './components/PokemonContext';
import MyPokemon from './containers/MyPokemon';

export default function App() {
  return (
    <PokemonProvider>
    <Router>
      <AppNavigator/>
        <Routes>
          <Route exact path="/" element={<Pokedex/>}/>
          <Route exact path="/pokemon/:id" element={<PokemonDetails/>}/>
          <Route exact path="/mypokemon" element={<MyPokemon />}/>
        </Routes>   
    </Router>
    </PokemonProvider>
  )
}