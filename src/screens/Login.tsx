import React, { useState, useContext } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
  try {
    await login({ email, password });
  } catch (e) {
    console.log("Falha no login", e);
  }
  }

  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall">Entrar</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginTop: 20 }}
      />

      <TextInput
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginTop: 10 }}
      />

      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 20 }}>
        Login
      </Button>

      <Button onPress={() => navigation.navigate("Register")} style={{ marginTop: 10 }}>
        Criar conta
      </Button>
    </Layout>
  );
}

