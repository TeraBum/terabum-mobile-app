import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, Searchbar, Card } from "react-native-paper";
import { useTheme } from "react-native-paper";

import Layout from "../components/Layout";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import TeraButton from "../components/TeraButton";

export default function Home({ navigation }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const categorias = [
    { id: 1, nome: "Periféricos", img: "https://i.postimg.cc/PrWg8XvQ/perifericos.jpg" },
    { id: 2, nome: "Notebooks", img: "https://i.postimg.cc/N0gJ0sQz/notebooks.jpg" },
    { id: 3, nome: "Hardware", img: "https://i.postimg.cc/282LKd6b/hardware.jpg" },
    { id: 4, nome: "Consoles", img: "https://i.postimg.cc/fbvbN6Kz/consoles.jpg" },
  ];

  const produtos = [
    {
      id: "1",
      name: "Headphone JBL",
      price: 120.0,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    },
    {
      id: "2",
      name: "Cabo USB C02",
      price: 50.0,
      image: "https://images.unsplash.com/photo-1592833158497-5c96f1a7f1d4?w=400",
    },
  ];

  return (
    <Layout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SAUDAÇÃO */}
        <Text variant="titleMedium">Olá, Andrea 👋</Text>

        <Text
          variant="headlineMedium"
          style={{ fontFamily: "PromptBold", marginTop: 4 }}
        >
          O que você busca hoje?
        </Text>

        {/* SEARCH */}
        <Searchbar
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            marginTop: 16,
            backgroundColor: theme.colors.secondary,
            borderRadius: 12,
          }}
          inputStyle={{ fontFamily: "Prompt" }}
          onIconPress={() => navigation.navigate("SearchProducts")}
        />

        {/* CATEGORIAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 24 }}
        >
          {categorias.map((c) => (
            <CategoryCard
              key={c.id}
              title={c.nome}
              image={c.img}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        {/* CARD DE DESTAQUE */}
        <Card
          style={{
            backgroundColor: theme.colors.primary + "20",
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                variant="titleLarge"
                style={{ fontFamily: "PromptBold", lineHeight: 28 }}
              >
                Headphone{"\n"}Samsung Pro
              </Text>

              <TeraButton style={{ marginTop: 12, width: 150 }}>
                Compre agora
              </TeraButton>
            </View>

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1580894894513-541b1a1c52a3?w=400",
              }}
              style={{ width: 120, height: 120, borderRadius: 12 }}
            />
          </Card.Content>
        </Card>

        {/* PRODUTOS */}
        <Text
          variant="titleMedium"
          style={{ fontFamily: "PromptBold", marginBottom: 12 }}
        >
          Produtos similares
        </Text>

        <ProductGrid
          data={produtos}
          onPressItem={(item) =>
            navigation.navigate("ProductDetails", { product: item })
          }
        />
      </ScrollView>
    </Layout>
  );
}

