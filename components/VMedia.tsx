import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";

interface VMediaProps {
  id: number;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VerticalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 12px;
  font-weight: 600;
  margin-top: 6px;
  margin-bottom: 3px;
`;
const Vote = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  font-size: 12px;
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
`;

const VMedia: React.FC<VMediaProps> = ({
  id,
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <VerticalContainer key={id}>
      <Poster path={posterPath} />
      <Title isDark={isDark}>
        {originalTitle.length > 10
          ? originalTitle.slice(0, 12) + "..."
          : originalTitle}
      </Title>
      <Vote isDark={isDark}>
        {voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : "Coming Soon"}
      </Vote>
    </VerticalContainer>
  );
};

export default VMedia;
