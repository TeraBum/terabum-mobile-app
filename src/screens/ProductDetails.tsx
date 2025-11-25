import React from "react";
import { View, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";

export default function ProductDetails({ route }) {
  const { product } = route.params;

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Card>
        <Card.Cover
          source={{ uri: "https://via.placeholder.com/300" }}
          style={{ height: 200 }}
        />
      </Card>

      <Text variant="headlineMedium">{product.name}</Text>
      <Text variant="titleMedium">R$ {product.price.toFixed(2)}</Text>

      <Text variant="bodyMedium" style={{ marginTop: 10 }}>
        Aqui vai a descrição do produto. Você pode substituir por dados reais.
      </Text>

      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => console.log("Adicionar ao carrinho")}
      >
        Adicionar ao Carrinho
      </Button>
    </View>
  );
}