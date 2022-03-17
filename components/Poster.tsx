import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../utils";

interface PosterProps {
  path: string;
}

const Image = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 5px;
`;

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImagePath(path) }} />
);

export default Poster;
