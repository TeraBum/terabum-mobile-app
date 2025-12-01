import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import Tabs from "./Tabs";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ProductDetails from "../screens/ProductDetails";
import Payment from "../screens/Payment";
import PaymentConfirm from "../screens/PaymentConfirm";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator id="auth-stack" screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          {/* Tabs é o container de Home/Search/Cart/Profile */}
          <Stack.Screen name="Tabs" component={Tabs} />

          {/* Telas que abrem POR CIMA das tabs */}
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
        </>
      )}
    </Stack.Navigator>
  );
}

