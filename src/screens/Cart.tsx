import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import Layout from "../components/Layout";
import {cartService} from "../services/cartService";

export default function Cart({ navigation }) {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
    setCart([
      {
        id: 1,
        name: "nome",
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 2,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 3,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 4,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 5,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 6,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 7,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 8,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 9,
      acc: "123",
      price: 154,
      qty: 5,
    },
      {
        id: 10,
      acc: "123",
      price: 154,
      qty: 5,
    },
  ])
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
      <ScrollView>
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
      </ScrollView>
    </Layout>
  );
}
