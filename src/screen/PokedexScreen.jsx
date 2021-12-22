import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getPokemonApi, getPokemonDetailByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(pokemons);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi();

      const pokemonsArray = [];

      for await (const pokemon of response.results) {
        const pokemonDetail = await getPokemonDetailByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          order: pokemonDetail.order,
          image: pokemonDetail.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <PokemonList pokemons={pokemons} />
    </View>
  );
}
