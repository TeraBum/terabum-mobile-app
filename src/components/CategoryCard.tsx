import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function CategoryCard({ title, image, onPress }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondary },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <Text
        variant="bodyMedium"
        style={{
          marginTop: 8,
          color: theme.colors.onSurface,
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    marginRight: 12,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
