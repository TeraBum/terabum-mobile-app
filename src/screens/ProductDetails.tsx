import React from "react";
import { View, Image } from "react-native";
import { Text, Card } from "react-native-paper";
import Layout from "../components/Layout";
import TeraButton from "../components/TeraButton";

export default function ProductDetails({ route, navigation }) {
  const { product } = route.params;

  return (
    <Layout navigation={navigation}>
      <Card style={{ borderRadius: 16 }}>
        <Card.Cover
          source={{ uri: product.image || "https://via.placeholder.com/300" }}
          style={{ height: 220, borderRadius: 16 }}
        />
      </Card>

      <Text
        variant="headlineMedium"
        style={{ fontFamily: "PromptBold", marginTop: 16 }}
      >
        {product.name}
      </Text>

      <Text
        variant="titleMedium"
        style={{
          marginTop: 6,
          fontFamily: "Prompt",
          color: "#24dbc5",
        }}
      >
        R$ {product.price.toFixed(2)}
      </Text>

      <Text style={{ marginTop: 16, opacity: 0.8 }}>
        {product.description}
      </Text>

      <TeraButton
        style={{ marginTop: 24 }}
        onPress={() => console.log("Adicionar ao carrinho")}
      >
        Adicionar ao Carrinho
      </TeraButton>
    </Layout>
  );
}

