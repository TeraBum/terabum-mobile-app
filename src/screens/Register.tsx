import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Layout from "../components/Layout";

const Register = () => {
  const [name, setName] = useState("");

  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Criar Conta
        </Text>

        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />

        <Button title="Cadastrar" onPress={() => console.log("Registrar")} />
      </View>
    </Layout>
  );
};

export default Register;
