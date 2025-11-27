import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasEmailError = email.length > 0 && !email.includes("@");

  function handleLogin() {
    // futura integração com sua API
    console.log("Login:", email, password);
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Entrar
      </Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        error={hasEmailError}
        style={{ marginBottom: 10 }}
      />
      {hasEmailError && (
        <HelperText type="error">Digite um e-mail válido.</HelperText>
      )}

      <TextInput
        label="Senha"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleLogin} style={{ marginBottom: 10 }}>
        Entrar
      </Button>

      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Criar conta
      </Button>
    </View>
  );
}
