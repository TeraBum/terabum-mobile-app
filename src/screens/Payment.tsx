import React from "react";
import { View, Text, Button } from "react-native";
import Layout from "../components/Layout";

const Payment = () => {
  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Pagamento
        </Text>

        <Text>Método de pagamento mockado.</Text>

        <Button
          title="Confirmar Pagamento"
          onPress={() => console.log("Pagamento efetuado")}
        />
      </View>
    </Layout>
  );
};

export default Payment;
