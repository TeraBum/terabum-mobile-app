import React from "react";
import { TextInput, useTheme } from "react-native-paper";

export default function TeraInput({ label, value, onChangeText, ...props }) {
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      outlineStyle={{
        borderRadius: 10,
        borderColor: theme.colors.primary,
      }}
      style={{
        marginBottom: 12,
        backgroundColor: theme.colors.surface,
      }}
      theme={{
        colors: {
          primary: theme.colors.primary,
          text: theme.colors.onSurface,
          placeholder: theme.colors.onSurface + "80",
        },
      }}
      {...props}
    />
  );
}
