import React, { useEffect, useState } from "react";
import { Text, Card } from "react-native-paper";
import Layout from "../components/Layout";
import {estoqueService} from "../services/estoqueService";

export default function Stock({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await estoqueService.listStock();
    setItems(data);
  }

  return (
    <Layout navigation={navigation}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        Estoque Interno
      </Text>

      {items.map((i: any) => (
        <Card key={i.id} style={{ marginBottom: 10 }}>
          <Card.Title title={i.name} subtitle={`Qtd: ${i.quantity}`} />
        </Card>
      ))}
    </Layout>
  );
}

