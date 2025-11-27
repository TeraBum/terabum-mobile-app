import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./tabs";
import ProductDetails from "../screens/ProductDetails";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tela inicial é Tabs (Home é a primeira aba) */}
      <Stack.Screen name="Tabs" component={Tabs} />

      {/* Outras telas */}
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
