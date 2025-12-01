import React from "react";
import { View } from "react-native";
import { Avatar, Text, List } from "react-native-paper";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile({ navigation }) {
  const { user, logout, isAdmin } = useAuth();

  return (
    <Layout navigation={navigation}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Avatar.Image
          size={90}
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
        />

        <Text variant="titleLarge" style={{ marginTop: 12 }}>
          {user?.name || "Usuário"}
        </Text>

        <Text style={{ opacity: 0.6, marginBottom: 24 }}>
          {user?.email || "Conta TeraBum"}
        </Text>
      </View>

      <List.Section>
        <List.Item
          title="Meus pedidos"
          left={() => <List.Icon icon="package-variant" />}
        />
        <List.Item
          title="Dados da conta"
          left={() => <List.Icon icon="account-edit" />}
        />
        <List.Item
          title="Endereços"
          left={() => <List.Icon icon="map-marker" />}
        />
        {isAdmin && (
          <List.Item
            title="Administração de Estoque"
            description="Gerenciar itens e produtos"
            left={() => <List.Icon icon="warehouse" />}
            onPress={() => navigation.navigate("Stock")}
          />
        )}
        <List.Item
          title="Sair"
          left={() => <List.Icon icon="logout" />}
          onPress={logout}
        />
      </List.Section>
    </Layout>
  );
}
