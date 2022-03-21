import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <LoaderView>
      <ActivityIndicator />
    </LoaderView>
  );
}

export default Loader;
