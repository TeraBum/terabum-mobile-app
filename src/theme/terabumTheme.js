import { MD3LightTheme } from "react-native-paper";

export const terabumTheme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,

    primary: "#24dbc5",
    secondary: "#e8eef5",
    text: "#000000",

    background: "#ffffff",
    surface: "#ffffff",

    onPrimary: "#ffffff",
    onSecondary: "#000000",
  },

  fonts: {
    regular: {
      fontFamily: "Prompt",
    },
    medium: {
      fontFamily: "Prompt",
    },
    bold: {
      fontFamily: "PromptBold",
    },
  },
};
