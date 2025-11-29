import React from "react";
import { View } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";
import Layout from "../components/Layout";
import {paymentService} from "../services/paymentService";

export default function Payment({ navigation }) {
  const [method, setMethod] = React.useState("credit");

  async function handlePayment() {
    await paymentService.createPayment({ method });
    navigation.navigate("PaymentConfirm");
  }

  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall" style={{ marginBottom: 20 }}>
        Pagamento
      </Text>

      <RadioButton.Group onValueChange={setMethod} value={method}>
        <RadioButton.Item label="Cartão de Crédito" value="credit" />
        <RadioButton.Item label="PIX" value="pix" />
        <RadioButton.Item label="Boleto" value="boleto" />
      </RadioButton.Group>

      <Button mode="contained" onPress={handlePayment}>
        Confirmar Pagamento
      </Button>
    </Layout>
  );
}

