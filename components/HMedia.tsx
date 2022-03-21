import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";

interface HMediaProps {
  id: number;
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
}

const HorizontalLists = styled.View`
  flex-direction: row;
  padding: 0 20px;
`;
const HorizontalColumn = styled.View`
  width: 90%;
  padding: 0 20px;
  justify-content: center;
`;
const HTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  width: 80%;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  width: 84%;
  margin-top: 8px;
`;
const ReleaseDate = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 10px;
`;

const HMedia: React.FC<HMediaProps> = ({
  id,
  posterPath,
  originalTitle,
  releaseDate,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <HorizontalLists key={id}>
      <Poster path={posterPath}></Poster>
      <HorizontalColumn>
        <HTitle isDark={isDark}>{originalTitle}</HTitle>
        {releaseDate && (
          <ReleaseDate isDark={isDark}>
            {new Date(releaseDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          </ReleaseDate>
        )}
        {overview !== "" && (
          <Overview isDark={isDark}>
            {overview.length > 90 ? overview.slice(0, 100) + "..." : overview}
          </Overview>
        )}
      </HorizontalColumn>
    </HorizontalLists>
  );
};

export default HMedia;
