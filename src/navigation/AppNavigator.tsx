import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import SearchProducts from "../screens/SearchProducts";
import ProductDetails from "../screens/ProductDetails";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Stock from "../screens/Stock";
import Cart from "../screens/Cart";
import Payment from "../screens/Payment";
import PaymentConfirm from "../screens/PaymentConfirm";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // usamos o Header.tsx interno
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SearchProducts" component={SearchProducts} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Stock" component={Stock} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
    </Stack.Navigator>
  );
}
