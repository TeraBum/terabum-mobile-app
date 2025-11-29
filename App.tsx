import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import Tabs from "./src/navigation/Tabs"; 

// Telas que abrem sobre as tabs (stack modal)
import ProductDetails from "./src/screens/ProductDetails";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Stock from "./src/screens/Stock";
import Payment from "./src/screens/Payment";
import PaymentConfirm from "./src/screens/PaymentConfirm";
import Profile from "./src/screens/Profile";

import { terabumTheme } from "./src/theme/terabumTheme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={terabumTheme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >

          {/* Navegação principal com footer */}
          <Stack.Screen name="Tabs" component={Tabs} />

          {/* TELAS MODAIS — ficam por cima das Tabs */}
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Stock" component={Stock} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
          <Stack.Screen name="Profile" component={Profile} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

