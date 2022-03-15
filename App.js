import React, { useState } from "react";
import AppLoading from "expo-app-loading";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onError={console.log}
        onFinish={onFinish}
      />
    );
  }
  return null;
}
