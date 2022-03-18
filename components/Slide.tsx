import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../utils";
import { BlurView } from "@react-native-community/blur";
import { StyleSheet, useColorScheme } from "react-native";
import Poster from "./Poster";

const Movie = styled.View`
  flex: 1;
`;
const BgImg = styled.Image`
  z-index: 0;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 22px;
  width: 55%;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 15px;
  font-weight: 900;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 12px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"};
`;
const Vote = styled(Overview)<{ isDark: boolean }>`
  font-weight: 600;
  font-size: 12px;
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
`;

interface SlideProps {
  id: number;
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
}

const Slide: React.FC<SlideProps> = ({
  id,
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Movie key={id}>
      <BgImg
        source={{ uri: makeImagePath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        blurType={isDark ? "dark" : "xlight"}
        blurAmount={3}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {overview !== "" && (
              <Overview isDark={isDark}>
                {overview.length > 90
                  ? overview.slice(0, 100) + "..."
                  : overview}
              </Overview>
            )}
            {voteAverage > 0 && (
              <Vote isDark={isDark}>⭐️ {voteAverage} / 10</Vote>
            )}
          </Column>
        </Wrapper>
      </BlurView>
    </Movie>
  );
};

export default Slide;
