import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Card, Text } from "react-native-paper";

const mockProducts = [
  { id: "1", name: "Camiseta Tech", price: 79.9 },
  { id: "2", name: "Fone Bluetooth", price: 199.9 },
  { id: "3", name: "Mouse Gamer", price: 149.9 },
];

export default function SearchProducts({ navigation }) {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Buscar produtos..."
        value={search}
        onChangeText={setSearch}
        mode="outlined"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate("ProductDetails", { product: item })}
            style={{ marginBottom: 12 }}
          >
            <Card.Title
              title={item.name}
              subtitle={`R$ ${item.price.toFixed(2)}`}
            />
          </Card>
        )}
      />
    </View>
  );
}