import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "ร้านกาแฟ UTCC" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "ใบเสร็จรับเงิน" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#0284c7",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  backButton: {
    backgroundColor: "#475569",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  infoText: {
    fontSize: 18,
    color: "#1e293b",
    marginBottom: 12,
    fontWeight: "600",
  },
  studentText: {
    fontSize: 16,
    color: "#059669",
    marginTop: 8,
    fontWeight: "bold",
  },
});