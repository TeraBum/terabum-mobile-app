import React from "react";
import { View, Image } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

export default function Header({ navigation }) {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Logo + Nome */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={{ uri: "https://i.postimg.cc/NFqJk61Q/logo.png" }}
          style={{ width: 38, height: 38, borderRadius: 10 }}
        />

        <Text
          variant="titleLarge"
          style={{
            fontFamily: "PromptBold",
            lineHeight: 18,
          }}
        >
          Tera{"\n"}Bum
        </Text>
      </View>

      {/* Ações: Carrinho → Busca → Perfil */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="cart-outline"
          onPress={() => navigation.navigate("Cart")}
        />
        <IconButton
          icon="magnify"
          onPress={() => navigation.navigate("SearchProducts")}
        />
        <IconButton
          icon="account-outline"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
  );
}
