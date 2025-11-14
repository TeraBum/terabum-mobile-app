import React from "react";
import { PaperProvider } from "react-native-paper";
import { terabumTheme } from "./src/theme/terabumTheme";
import Home from "./src/screens/Home";

export default function App() {
  return (
    <PaperProvider theme={terabumTheme}>
      <Home />
    </PaperProvider>
  );
}
