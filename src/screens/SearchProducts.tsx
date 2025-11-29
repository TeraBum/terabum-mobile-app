import React, { useState } from "react";
import { View, FlatList, Pressable, Dimensions } from "react-native";
import { TextInput, Card, Text } from "react-native-paper";
import Layout from "../components/Layout";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 20 * 2 - 12) / 2;

const mockProducts = [
  { id: "1", name: "Camiseta Tech", price: 79.9 },
  { id: "2", name: "Fone Bluetooth", price: 199.9 },
  { id: "3", name: "Mouse Gamer", price: 149.9 },
  { id: "4", name: "Teclado RGB", price: 299.9 },
];

export default function SearchProducts({ navigation }) {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout navigation={navigation}>
      <TextInput
        placeholder="Buscar produtos..."
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        left={<TextInput.Icon icon="magnify" />}
        style={{ borderRadius: 12 }}
      />

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingBottom: 40, marginTop: 20, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Card style={{ width: CARD_WIDTH, borderRadius: 14 }}>
              <Card.Content>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ marginTop: 6, opacity: 0.7 }}>
                  R$ {item.price.toFixed(2)}
                </Text>
              </Card.Content>
            </Card>
          </Pressable>
        )}
      />
    </Layout>
  );
}
