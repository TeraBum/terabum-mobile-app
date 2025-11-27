import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Conta criada com sucesso!");
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Criar conta
      </Text>

      <TextInput label="Nome completo" value={nome} onChangeText={setNome} mode="outlined" style={{ marginBottom: 12 }} />
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" mode="outlined" style={{ marginBottom: 12 }} />
      <TextInput label="Senha" value={senha} onChangeText={setSenha} secureTextEntry mode="outlined" style={{ marginBottom: 12 }} />
      <TextInput label="Confirmar senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry mode="outlined" style={{ marginBottom: 20 }} />

      <Button mode="contained" onPress={handleRegister} style={{ paddingVertical: 6 }}>
        Criar conta
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "#6200ee" }}>
          Já possui conta? Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
