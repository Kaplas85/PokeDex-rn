import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screen/FavoriteScreen";

const Stack = createNativeStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}
