import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("two")}>
    <Text>Go To Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("three")}>
    <Text>Go To Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go To Search</Text>
  </TouchableOpacity>
);

const MovieStack = createNativeStackNavigator();

const Stack = () => (
  <MovieStack.Navigator>
    <MovieStack.Screen name="one" component={ScreenOne} />
    <MovieStack.Screen name="two" component={ScreenTwo} />
    <MovieStack.Screen name="three" component={ScreenThree} />
  </MovieStack.Navigator>
);

export default Stack;
