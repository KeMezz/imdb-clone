import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";
import { QueryClientProvider, QueryClient } from "react-query";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [assets] = useAssets([]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  const queryClient = new QueryClient();
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <StatusBar />
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
