// src/screens/Profile.tsx
import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";

export default function Profile({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text style={{ textAlign: "center", marginBottom: 16 }}>
          Você precisa entrar para acessar o perfil
        </Text>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Entrar
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ textAlign: "center", marginTop: 12, color: "#6200ee" }}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Avatar.Image size={80} source={{ uri: user.avatar }} />
      <Text style={{ textAlign: "center", marginTop: 12, fontWeight: "bold" }}>
        {user.name}
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 24 }}>{user.email}</Text>
      <Button mode="outlined" onPress={logout}>
        Sair
      </Button>
    </View>
  );
}
