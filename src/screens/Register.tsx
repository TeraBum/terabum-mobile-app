import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import Layout from "../components/Layout";
import {userService} from "../services/userService";

export default function Register({ navigation }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleRegister() {
    await userService.register(form.name, form.email, form.password);
    navigation.navigate("Login");
  }

  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall">Criar Conta</Text>

      <TextInput
        label="Nome"
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
        style={{ marginTop: 20 }}
      />

      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
        style={{ marginTop: 10 }}
      />

      <TextInput
        label="Senha"
        secureTextEntry
        value={form.password}
        onChangeText={(v) => setForm({ ...form, password: v })}
        style={{ marginTop: 10 }}
      />

      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleRegister}>
        Registrar
      </Button>
    </Layout>
  );
}

