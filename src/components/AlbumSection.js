import "../styles/Discography.css";
import {
  AlbumContainer,
  AlbumHeader,
  AlbumDetails,
  AlbumCover,
  AlbumIcons,
} from "../styles/Discography.styled.js";
import { useState, useEffect } from "react";
import { spotifyAPI } from "../spotify";
import { getReleaseDate } from "../utils/ApiData";
import AlbumRow from "./AlbumRow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function AlbumSection({ album }) {
  const [favorite, setFavorite] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyAPI
      .getAlbumTracks(album.id)
      .then((data) => setTracks(data.items))
      .catch((err) => console.error(err));
    spotifyAPI
      .containsMySavedAlbums([album.id])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [album]);

  return (
    <AlbumContainer>
      <AlbumHeader>
        <AlbumCover>
          <img src={album?.images[0].url} />
        </AlbumCover>
        <AlbumDetails>
          <h3>{album?.name}</h3>
          <span>
            <strong>{getReleaseDate(album?.["release_date"])}</strong>
          </span>
          <p>{album?.type}</p>
          <p>
            <span>{album?.["total_tracks"]}</span> tracks
          </p>
        </AlbumDetails>
        <AlbumIcons>
          <PlayCircleFilledIcon fontSize="large" />
          {favorite ? (
            <FavoriteIcon fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
          <MoreHorizIcon />
        </AlbumIcons>
      </AlbumHeader>
      <div>
        {tracks.map((track) => (
          <AlbumRow key={track.id} item={track} />
        ))}
      </div>
    </AlbumContainer>
  );
}

export default AlbumSection;
