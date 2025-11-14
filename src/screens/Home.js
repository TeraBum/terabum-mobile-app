import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import {
  Text,
  Searchbar,
  Chip,
  Card,
  Avatar,
} from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Home() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoria, setCategoria] = useState("Periféricos");

  const categorias = ["Periféricos", "Notebooks", "Hardware", "Consoles"];

  const produtos = [
    {
      id: 1,
      nome: "Headphone JBL",
      preco: "R$ 120,00",
      imagem:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    },
    {
      id: 2,
      nome: "Cabo C02",
      preco: "R$ 50,00",
      imagem:
        "https://images.unsplash.com/photo-1592833158497-5c96f1a7f1d4?w=400",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}>

      {/* HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{ uri: "https://i.postimg.cc/NFqJk61Q/logo.png" }}
            style={{ width: 38, height: 38 }}
          />
          <Text variant="titleLarge" style={{ fontFamily: "PromptBold", lineHeight: 18 }}>
            Tera{"\n"}Bum
          </Text>
        </View>

        <Avatar.Image
          size={46}
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
        />
      </View>

      {/* SAUDAÇÃO */}
      <Text variant="bodyLarge" style={{ marginTop: 24 }}>
        Olá, Andrea
      </Text>
      <Text variant="headlineMedium" style={{ fontFamily: "PromptBold" }}>
        O que você busca hoje?
      </Text>

      {/* SEARCH */}
      <Searchbar
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          marginTop: 16,
          backgroundColor: theme.colors.secondary,
          elevation: 0,
        }}
        inputStyle={{ fontFamily: "Prompt" }}
      />

      {/* CATEGORIAS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 24 }}>
        {categorias.map((item) => (
          <Chip
            key={item}
            selected={categoria === item}
            onPress={() => setCategoria(item)}
            style={{ marginRight: 10 }}
            showSelectedOverlay
          >
            {item}
          </Chip>
        ))}
      </ScrollView>

      {/* CARD DE DESTAQUE */}
      <Card style={{ backgroundColor: "#e6fffb", marginBottom: 20 }}>
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text variant="titleLarge" style={{ fontFamily: "PromptBold" }}>
              Headphone{"\n"}Samsung
            </Text>
            <Text
              variant="labelLarge"
              style={{ marginTop: 10, color: theme.colors.primary, fontFamily: "PromptBold" }}
            >
              Compre agora →
            </Text>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1580894894513-541b1a1c52a3?w=400",
            }}
            style={{ width: 110, height: 110 }}
          />
        </Card.Content>
      </Card>

      {/* LISTA DE PRODUTOS */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text variant="titleMedium" style={{ fontFamily: "PromptBold" }}>
          Produtos Similares
        </Text>
        <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
          Ver tudo
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {produtos.map((p) => (
          <Card
            key={p.id}
            style={{
              width: 150,
              marginRight: 14,
              backgroundColor: theme.colors.secondary,
            }}
          >
            <Card.Cover
              source={{ uri: p.imagem }}
              style={{ height: 100 }}
            />
            <Card.Content>
              <Text variant="titleSmall" style={{ fontFamily: "PromptBold", marginTop: 6 }}>
                {p.nome}
              </Text>
              <Text variant="bodyMedium">{p.preco}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
