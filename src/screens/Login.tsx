import React, { useState, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login({ email, password });
    if (!res.success) alert(res.message);
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleLogin} style={{ paddingVertical: 6 }}>
        Entrar
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "#6200ee" }}>
          Não possui conta? Registrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
