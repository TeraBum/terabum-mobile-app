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
import { AuthProvider, useAuth } from "./src/context/AuthContext";

import { terabumTheme } from "./src/theme/terabumTheme";

const Stack = createNativeStackNavigator();

function Routes(){
  const {user} = useAuth();

  return <Stack.Navigator
    id="root-stack"
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >

    {user ? (
      <>
    {/* Navegação principal com footer */}
    <Stack.Screen name="Tabs" component={Tabs} />

    {/* TELAS MODAIS — ficam por cima das Tabs */}
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
    <Stack.Screen name="Stock" component={Stock} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
    <Stack.Screen name="Profile" component={Profile} />
    </>
    ) : (
      <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </>
    )}

  </Stack.Navigator>
}

export default function App() {
  return (
    <PaperProvider theme={terabumTheme}>
      <AuthProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
