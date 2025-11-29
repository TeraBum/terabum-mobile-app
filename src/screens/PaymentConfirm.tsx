import React from "react";
import { Text, Button } from "react-native-paper";
import Layout from "../components/Layout";

export default function PaymentConfirm({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        Pedido Confirmado! 🎉
      </Text>

      <Text style={{ marginBottom: 24 }}>
        Seu pagamento foi processado com sucesso.
      </Text>

      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Voltar para Home
      </Button>
    </Layout>
  );
}

