import React from "react";
import { View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductGrid({ data, onPressItem }) {
  return (
    <View style={styles.grid}>
      {data.map((item, index) => (
        <View
          key={item?.id ?? `product-${index}`}
          style={styles.item}
        >
          <ProductCard product={item} onPress={() => onPressItem(item)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  item: {
    width: "48%",
    marginBottom: 16,
  },
});
