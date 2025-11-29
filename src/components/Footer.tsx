import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";

export default function Footer({ navigation }) {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "home", title: "Início", icon: "home-outline" },
    { key: "search", title: "Buscar", icon: "magnify" },
    { key: "cart", title: "Carrinho", icon: "cart-outline" },
    { key: "account", title: "Conta", icon: "account-outline" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => null,
    search: () => null,
    cart: () => null,
    account: () => null,
  });

  const handleNavigate = (newIndex) => {
    setIndex(newIndex);

    const selected = routes[newIndex].key;

    if (selected === "home") navigation.navigate("Home");
    if (selected === "search") navigation.navigate("SearchProducts");
    if (selected === "cart") navigation.navigate("Cart");
    if (selected === "account") navigation.navigate("Profile");
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleNavigate}
      renderScene={renderScene}
      shifting={false}
      labeled
    />
  );
}

