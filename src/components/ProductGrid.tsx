import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductGrid({ data, onPressItem }) {
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <ProductCard product={item} onPress={() => onPressItem(item)} />
        </View>
      )}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    marginBottom: 16,
    maxWidth: "48%",
  },
});
