import "../styles/Discography.css";
import {
  AlbumHeader,
  AlbumDetails,
  AlbumCover,
  AlbumIcons,
  } from '../styles/Discography.styled.js'
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
  }, []);

  return (
    <div>
      <AlbumHeader>
        <AlbumCover src={album?.images[0].url}/>
        <AlbumDetails>
          <h3>{album?.name}</h3>
          <p>{album?.type}</p>
          <span>{() => getReleaseDate(album?.["release_date"])}</span>
          <p>
            <span>{album?.["total_tracks"]}</span> tracks
          </p>
        </AlbumDetails>
        <AlbumIcons>
          <PlayCircleFilledIcon />
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <MoreHorizIcon />
        </AlbumIcons>
      </AlbumHeader>
      <div>
        {tracks.map((track) => (
          <AlbumRow key={track.id} item={track} />
        ))}
      </div>
    </div>
  );
}

export default AlbumSection;
