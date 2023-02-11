import React from "react";

function PokemonDetail({ pokemon }) {
  if (!pokemon) {
    return <div>Select a pokemon to view its detail</div>;
  }
  return (
    <div className="pokemon-detail">
      {pokemon ? (
        <>
          <div>
            <img src={pokemon.img} alt="pokemon" />
          </div>
          <div>
            <div>Name: {pokemon.name}</div>
            <div>Number: {pokemon.num}</div>
            <div>Type: {pokemon.type.join(", ")}</div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
            <div>Candy: {pokemon.candy}</div>
            <div>Candy Count: {pokemon.candy_count}</div>
            <div>Egg: {pokemon.egg}</div>
            <div>Spawn Chance: {pokemon.spawn_chance}</div>
            <div>Average Spawns: {pokemon.avg_spawns}</div>
            <div>Spawn Time: {pokemon.spawn_time}</div>
            <div>Weaknesses: {pokemon.weaknesses.join(", ")}</div>
          </div>
        </>
      ) : (
        <div>No pokemon selected</div>
      )}
    </div>
  );
}

export default PokemonDetail;
