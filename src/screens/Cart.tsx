import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Cart() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Carrinho vazio</Text>
      <Button mode="contained">Ir para pagamento</Button>
    </View>
  );
}
