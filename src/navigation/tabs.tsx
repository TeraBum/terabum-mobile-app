import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import SearchProducts from "../screens/SearchProducts";
import ProductDetails from "../screens/ProductDetails";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ff6b00",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { height: 65, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          let icon = "home";

          if (route.name === "Home") icon = "home";
          if (route.name === "SearchProducts") icon = "search";
          if (route.name === "ProductDetails") icon = "pricetag";

          return <Ionicons name={icon as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SearchProducts" component={SearchProducts} />
      <Tab.Screen name="ProductDetails" component={ProductDetails} />
    </Tab.Navigator>
  );
}
