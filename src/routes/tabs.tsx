// src/routes/tabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import SearchProducts from "../screens/SearchProducts";
import Cart from "../screens/Cart";
import Estoque from "../screens/Estoque";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchProducts} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Estoque" component={Estoque} />
    </Tab.Navigator>
  );
}
