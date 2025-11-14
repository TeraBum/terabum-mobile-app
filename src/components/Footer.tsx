// src/components/Footer.tsx
import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";

export default function Footer() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "home", title: "Início", icon: "home" },
    { key: "products", title: "Produtos", icon: "magnify" },
    { key: "cart", title: "Carrinho", icon: "cart" },
    { key: "profile", title: "Perfil", icon: "account" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => null,
    products: () => null,
    cart: () => null,
    profile: () => null,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
