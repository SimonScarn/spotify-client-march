import "../styles/Album.css";
import "../styles/global.css";
import {
  Container,
  Image,
  Header,
  ArtistInfo,
  Title,
  AlbumInfo,
  AlbumDetails,
  Controls,
  Toolbar,
  TracksContainer,
} from "../styles/Album.styled.js";

import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getAlbumDuration, getReleaseDate } from "../utils/ApiData";
import AlbumRow from "./AlbumRow";
import TopHeader from "./TopHeader";
import { IconButton } from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TimerIcon from "@mui/icons-material/Timer";
import PauseIcon from "@mui/icons-material/Pause";

function Album() {
  const location = useLocation();
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [album, setAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumDuration, setAlbumDuration] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const albumID = location.pathname.split("/")[2];
    spotifyAPI
      .getAlbum(albumID)
      .then((data) => {
        setAlbum(data);
        setAlbumDuration(() => getAlbumDuration(data.tracks));
        setReleaseDate(() => getReleaseDate(data["release_date"]));
      })
      .catch((err) => console.error(err));
    spotifyAPI
      .containsMySavedAlbums([albumID])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [location]);

  function addFavorite() {
    spotifyAPI
      .addToMySavedAlbums([album.id])
      .then(() => setFavorite(true))
      .catch((err) => console.log(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedAlbums([album.id])
      .then(() => setFavorite(false))
      .catch((err) => console.log(err));
  }

  function playAlbum() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else {
      setIsPlaying(true);
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:album:${album.id}`],
      });
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    }
  }



  return (
    <Container>
      <TopHeader />
      <Header>
        <Image alt="album cover" src={album?.images[1].url} />
        <div>
          <p style={{ textTransform: "uppercase" }}>{album?.["album_type"]}</p>
          <AlbumDetails>
            <Title>{album?.name}</Title>
            <Controls>
              <div>
                <MusicNoteIcon />
                <span>{album?.tracks.total}</span>
                {album?.tracks.total > 1 ? "tracks" : "track"}
              </div>
              <div>
                <TimerIcon />
                <span>{albumDuration}</span>
              </div>
            </Controls>
          </AlbumDetails>
          <ArtistInfo>
            {album?.artists.map((artist) => (
              <Link to={`/artist/${artist.id}`} className="itemLink">
                <span>{artist.name}</span>
              </Link>
            ))}
          </ArtistInfo>
          <AlbumInfo>
            <span>{releaseDate}</span>
            <span>{album?.label}</span>
          </AlbumInfo>
        </div>
      </Header>
      <Toolbar>
        <IconButton onClick={playAlbum}>
          {isPlaying ? <PauseIcon /> : <PlayCircleFilledIcon />}
        </IconButton>
        {favorite ? (
          <FavoriteIcon onClick={removeFavorite} />
        ) : (
          <FavoriteBorderIcon onClick={addFavorite} />
        )}

        <MoreHorizIcon />
      </Toolbar>
      <TracksContainer>
        {album?.tracks.items.map((item) => {
          return <AlbumRow key={item.id} item={item} />;
        })}
      </TracksContainer>
    </Container>
  );
}

export default Album;
