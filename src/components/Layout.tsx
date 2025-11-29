import React from "react";
import { View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {children}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}
