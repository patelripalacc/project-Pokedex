import React, { useState, useEffect } from "react";
import "./App.css";
// import PokemonDetail from "./pages/PokemonDetail";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const uniqueTypes = Array.from(new Set(pokemonData.flatMap((p) => p.type)));
  const uniqueWeaknesses = Array.from(
    new Set(pokemonData.flatMap((p) => p.weaknesses))
  );
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      );
      const data = await result.json();
      setPokemonData(data.pokemon);
      setFilteredPokemon(data.pokemon);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedTypes.length ||
            selectedTypes.some((selectedType) =>
              pokemon.type.includes(selectedType)
            )) &&
          (!selectedWeaknesses.length ||
            selectedWeaknesses.some((selectedWeakness) =>
              pokemon.weaknesses.includes(selectedWeakness)
            ))
      )
    );
  }, [searchTerm, selectedTypes, selectedWeaknesses, pokemonData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilter = (event) => {
    setSelectedTypes([event.target.value]);
  };

  const handleWeaknessFilter = (event) => {
    setSelectedWeaknesses([event.target.value]);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <label className="name-label" htmlFor="pokemonName">
        Name Search:
      </label>
      <input
        className="name-input"
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
      />
      <div className="type">
        Type:
        <select onChange={(event) => handleTypeFilter(event)}>
          <option value="">-- Select Type --</option>
          {uniqueTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="weaknesses">
        Weaknesses:
        <select onChange={(event) => handleWeaknessFilter(event)}>
          <option value="">-- Select Weakness --</option>
          {uniqueWeaknesses.map((weakness) => (
            <option value={weakness} key={weakness}>
              {weakness}
            </option>
          ))}
        </select>
      </div>
      <div className="pokemon-list">
        <ul className="pokemon-display">
          {filteredPokemon.map((pokemon) => (
            <div key={pokemon.id}>
              <a className="pokemon-name" key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
                {pokemon.name}
              </a>
              <div className="pokemon-number">Number: {pokemon.num}</div>
              <div className="pokemon-type">Type: {pokemon.type.join(", ")}</div>
              <div className="pokemon-weaknesses">Weaknesses: {pokemon.weaknesses.join(", ")}</div>
              <img src={pokemon.img} alt="pokemon" />
            </div>
          ))}
        </ul>
        {/* <div className="pokemon-detail">
          {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
        </div> */}
      </div>
    </div>
  );
};
export default App;
