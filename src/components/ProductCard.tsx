import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";

export default function ProductCard({ product, onPress }) {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
      ]}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Cover
        source={{ uri: product.image }}
        style={styles.image}
      />

      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {product.name}
        </Text>

        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {product.description}
        </Text>

        <Text variant="titleLarge" style={{ marginTop: 8 }}>
          R$ {product.price}
        </Text>
      </Card.Content>

      <Card.Actions>
        <Button
          textColor={theme.colors.primary}
          onPress={onPress}
        >
          Ver detalhes
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  image: {
    height: 140,
  },
  title: {
    marginBottom: 4,
    fontWeight: "600",
  },
});
