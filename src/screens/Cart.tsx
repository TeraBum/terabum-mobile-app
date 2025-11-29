import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import Layout from "../components/Layout";
import {cartService} from "../services/cartService";

export default function Cart({ navigation }) {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await cartService.getCart();
      setCart(response.items || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        Seu Carrinho
      </Text>

      {cart.map((item) => (
        <Card key={item.id} style={{ marginBottom: 10 }}>
          <Card.Title title={item.name} subtitle={`Qtd: ${item.qty}`} />
          <Card.Content>
            <Text>R$ {item.price}</Text>
          </Card.Content>
        </Card>
      ))}

      <Text variant="titleMedium" style={{ marginVertical: 16 }}>
        Total: R$ {total.toFixed(2)}
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Payment")}
      >
        Finalizar Compra
      </Button>
    </Layout>
  );
}
