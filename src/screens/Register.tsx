import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { userService } from "../services/userService";  // quando tiver a API

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

    try {
      // 🔒 Depois você liga na API real:
      // const response = await userService.register({ nome, email, senha });

      alert("Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      alert("Erro ao registrar");
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      
      {/* TÍTULO */}
      <Text variant="headlineMedium" style={{ fontFamily: "PromptBold", marginBottom: 20 }}>
        Criar conta
      </Text>

      {/* NOME */}
      <TextInput
        label="Nome completo"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={{ marginBottom: 12 }}
      />

      {/* EMAIL */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={{ marginBottom: 12 }}
      />

      {/* SENHA */}
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        mode="outlined"
        style={{ marginBottom: 12 }}
      />

      {/* CONFIRMAR SENHA */}
      <TextInput
        label="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        mode="outlined"
        style={{ marginBottom: 20 }}
      />

      {/* BOTÃO CRIAR CONTA */}
      <Button
        mode="contained"
        onPress={handleRegister}
        style={{ paddingVertical: 6 }}
      >
        Criar conta
      </Button>

      {/* LOGIN */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#6200ee",
            fontFamily: "PromptBold",
          }}
        >
          Já possui conta? Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
