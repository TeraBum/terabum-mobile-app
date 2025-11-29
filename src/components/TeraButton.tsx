import React from "react";
import { Button, useTheme } from "react-native-paper";

export default function TeraButton({ children, style, ...props }) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
      style={[
        {
          borderRadius: 10,
          paddingVertical: 4,
        },
        style,
      ]}
      labelStyle={{
        fontSize: 16,
        fontWeight: "600",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
