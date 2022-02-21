import "../styles/ShowRow.css";
import {
  Container,
  Image,
  EpisodeInfo,
  EpisodeDescription,
  Toolbar,
} from '../styles/ShowRow.styled.js';
import { useState, useEffect } from "react";
import { getReleaseDate } from "../utils/ApiData";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function ShowRow({ item }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Container>
      <Image src={item?.images[1].url} />
      <div>
        <EpisodeInfo>
          <h4>{item?.name}</h4>
          <EpisodeDescription>{item?.description}</EpisodeDescription>
        </EpisodeInfo>
        <Toolbar>
          <PlayCircleFilledWhiteIcon />
          <p>{() => getReleaseDate(item["release_date"])}</p>
          <AddCircleOutlineIcon />
        </Toolbar>
      </div>
    </Container>
  );
}

export default ShowRow;
