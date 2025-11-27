import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import SearchProducts from "../screens/SearchProducts";
import Cart from "../screens/Cart";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"  // garante que Home abra primeiro
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#9e9e9e",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="SearchProducts"
        component={SearchProducts}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="shopping-cart" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
