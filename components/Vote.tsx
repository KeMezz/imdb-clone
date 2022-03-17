import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Text = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  color: #fff;
  font-size: 12px;
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
`;

interface VoteProps {
  vote: string;
}

const Vote: React.FC<VoteProps> = ({ vote }) => {
  const isDark = useColorScheme() === "dark";
  return <Text isDark={isDark}>{vote}</Text>;
};
