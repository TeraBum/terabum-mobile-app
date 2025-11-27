import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Layout from "../components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Login
        </Text>

        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Entrar" onPress={() => console.log("Login")} />
      </View>
    </Layout>
  );
};

export default Login;
