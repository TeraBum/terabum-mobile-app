import React from "react";
import { View, Text } from "react-native";
import Layout from "../components/Layout";

const PaymentConfirm = () => {
  return (
    <Layout>
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Pagamento Confirmado!
        </Text>

        <Text>Obrigado pela sua compra.</Text>
      </View>
    </Layout>
  );
};

export default PaymentConfirm;
