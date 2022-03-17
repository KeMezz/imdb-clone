import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset, useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

export default function App() {
  const [assets] = useAssets([]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {/* <Stack /> */}
      {/* <Tabs /> */}
      <Root />
    </NavigationContainer>
  );
}
