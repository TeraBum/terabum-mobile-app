import React from "react";
import { View, Text, FlatList } from "react-native";
import Layout from "../components/Layout";

const Stock = () => {
  const mockStock = [
    { id: "1", name: "Produto A", qty: 12 },
    { id: "2", name: "Produto B", qty: 5 },
  ];

  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Estoque
        </Text>

        <FlatList
          data={mockStock}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.name}</Text>
              <Text>Quantidade: {item.qty}</Text>
            </View>
          )}
        />
      </View>
    </Layout>
  );
};

export default Stock;
