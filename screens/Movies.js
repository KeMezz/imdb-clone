import React from "react";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: dodgerblue;
  font-size: 38px;
  font-weight: bold;
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "three" })}>
    <Title>Movies</Title>
  </Btn>
);

export default Movies;
