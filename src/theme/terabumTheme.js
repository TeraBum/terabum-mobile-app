import { DefaultTheme } from "react-native-paper";

export const terabumTheme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#24dbc5",
    secondary: "#e8eef5",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
    onPrimary: "#ffffff",
    onSecondary: "#000000",
  },
};
