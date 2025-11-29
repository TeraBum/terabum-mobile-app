import React from "react";
import { View } from "react-native";
import { Avatar, Text, List } from "react-native-paper";
import Layout from "../components/Layout";

export default function Profile({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Avatar.Image
          size={90}
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
        />

        <Text variant="titleLarge" style={{ marginTop: 12 }}>
          Andrea Silva
        </Text>

        <Text style={{ opacity: 0.6, marginBottom: 24 }}>
          Usuária do TeraBum
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
        <List.Item
          title="Sair"
          left={() => <List.Icon icon="logout" />}
        />
      </List.Section>
    </Layout>
  );
}
