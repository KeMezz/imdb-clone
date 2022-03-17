import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne: React.FC<NativeStackScreenProps<any, "ScreenOne">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("two")}>
    <Text>Go To Two</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<NativeStackScreenProps<any, "ScreenTwo">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("three")}>
    <Text>Go To Three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, "ScreenThree">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go To Search</Text>
  </TouchableOpacity>
);

const MovieStack = createNativeStackNavigator();

const Stack: React.FC<NativeStackScreenProps<any, "Stack">> = () => (
  <MovieStack.Navigator>
    <MovieStack.Screen name="one" component={ScreenOne} />
    <MovieStack.Screen name="two" component={ScreenTwo} />
    <MovieStack.Screen name="three" component={ScreenThree} />
  </MovieStack.Navigator>
);

export default Stack;
