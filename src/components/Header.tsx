// src/components/Header.tsx
import React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function Header() {
  const theme = useTheme();

  return (
    <Appbar.Header
      mode="center-aligned"
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      <Appbar.Content
        title="TeraBum"
        titleStyle={{ color: theme.colors.onPrimary, fontSize: 20 }}
      />
    </Appbar.Header>
  );
}
