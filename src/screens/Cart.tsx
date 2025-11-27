import React from "react";
import { View, Text, Button } from "react-native";
import Layout from "../components/Layout";

const Cart = () => {
  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Carrinho
        </Text>

        <Text>Seu carrinho está vazio (mock).</Text>

        <Button title="Finalizar Compra" onPress={() => console.log("Checkout")} />
      </View>
    </Layout>
  );
};

export default Cart;
