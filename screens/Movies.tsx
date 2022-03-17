import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import { ScrollView } from "react-native";
import Poster from "../components/Poster";

interface iMovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Movie = styled.View`
  flex: 1;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 22px;
  font-weight: 700;
  margin-left: 20px;
`;
const Scroll = styled.ScrollView`
  margin-top: 20;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-weight: 600;
  margin-top: 6px;
  margin-bottom: 3px;
`;
const Vote = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  font-size: 12px;
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";

  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [tredingMovies, setTredingMovies] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTredingMovies(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setUpComingMovies(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setNowPlayingMovies(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT / 4,
          marginBottom: 20,
        }}
      >
        {nowPlayingMovies.map((movie) => (
          <Slide
            key={movie.id}
            id={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
            voteAverage={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListTitle isDark={isDark}>Treding Movies</ListTitle>
      <Scroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {tredingMovies.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title isDark={isDark}>
              {movie.original_title.length > 10
                ? movie.original_title.slice(0, 10) + "..."
                : movie.original_title}
            </Title>
            <Vote isDark={isDark}>⭐️ {movie.vote_average} / 10</Vote>
          </Movie>
        ))}
      </Scroll>
    </Container>
  );
};

export default Movies;
