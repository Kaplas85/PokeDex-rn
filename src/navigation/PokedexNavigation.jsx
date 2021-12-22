import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../screen/PokedexScreen";
import PokemonScreen from "../screen/PokemonScren";

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: "" }}
      />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
}
