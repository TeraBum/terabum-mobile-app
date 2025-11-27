import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import Tabs from "./tabs";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Cart from "../screens/Cart";
import Payment from "../screens/Payment";
import PaymentConfirm from "../screens/PaymentConfirm";
import Stock from "../screens/Stock";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* SE NÃO ESTÁ LOGADO → LOGIN */}
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          {/* ÁREA LOGADA */}
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
          <Stack.Screen name="Stock" component={Stock} />
        </>
      )}
    </Stack.Navigator>
  );
}
