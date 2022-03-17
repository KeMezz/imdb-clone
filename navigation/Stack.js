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
const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Back to Two</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="one" component={ScreenOne} />
    <NativeStack.Screen name="two" component={ScreenTwo} />
    <NativeStack.Screen name="three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
