import React from "react";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Body({ children, style }) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: 16,
          color: theme.colors.onSurface,
          lineHeight: 22,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
