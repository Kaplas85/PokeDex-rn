import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getPokemonApi, getPokemonDetailByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import LoadingPopUp from "../components/loading/LoadingPopUp";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);

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
      setError(true);
    }
  };

  return (
    <View style={styles.content}>
      {error && (
        <LoadingPopUp error={true} text="¡Error al cargar la Pokedex!" />
      )}
      {loading && (
        <LoadingPopUp error={false} text="Estamos cargando la pokedex" />
      )}
      {!loading && !error && (
        <PokemonList
          pokemons={pokemons}
          loadPokemons={loadPokemons}
          isNext={nextUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 35,
  },
});
