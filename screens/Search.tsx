import React, { useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { getMovies, getTVs } from "../api";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 20px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const onInputChange = (text: string) => setQuery(text);
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], getMovies.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTVs,
  } = useQuery(["searchTv", query], getTVs.search, { enabled: false });
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTVs();
  };
  console.log(movieData, tvData);

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show..."
        placeholderTextColor="#333"
        returnKeyType="search"
        onChangeText={onInputChange}
        onSubmitEditing={onSubmit}
        autoCorrect
      />
    </Container>
  );
};

export default Search;
