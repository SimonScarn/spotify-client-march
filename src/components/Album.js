import { Wrapper, Toolbar } from "../styles/Global.styled.js";
import {
  Image,
  Header,
  ArtistInfo,
  ArtistLink,
  Title,
  AlbumInfo,
  AlbumDetails,
  Controls,
  TracksContainer,
  PlayBtn,
} from "../styles/Album.styled.js";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
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
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const albumID = location.pathname.split("/")[2];
    spotifyAPI
      .getAlbum(albumID)
      .then((data) => {
        setAlbum(data);
        setAlbumDuration(() => getAlbumDuration(data.tracks));
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
    <Wrapper>
      <TopHeader />
      <Header>
        <Image alt="album cover" src={album?.images[1].url} />
        <div>
          <p style={{ textTransform: "uppercase" }}>{album?.["album_type"]}</p>
          <AlbumDetails>
            <Title>{album?.name}</Title>
            <p>{getReleaseDate(album?.['release_date'])}</p>
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
              <ArtistLink to={`/artist/${artist.id}`}>
                <span>{artist.name}</span>
              </ArtistLink>
            ))}
          </ArtistInfo>
          <AlbumInfo>
            <span>{album?.label}</span>
          </AlbumInfo>
        </div>
      </Header>
      <Toolbar>
        <PlayBtn onClick={playAlbum} size="large">
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayCircleFilledIcon fontSize="large" />
          )}
        </PlayBtn>
        {favorite ? (
          <FavoriteIcon
            style={{ cursor: "pointer" }}
            onClick={removeFavorite}
            fontSize="large"
          />
        ) : (
          <FavoriteBorderIcon
            style={{ cursor: "pointer" }}
            onClick={addFavorite}
            fontSize="large"
          />
        )}

        <MoreHorizIcon />
      </Toolbar>
      <TracksContainer>
        {album?.tracks.items.map((item) => {
          return <AlbumRow key={item.id} item={item} />;
        })}
      </TracksContainer>
    </Wrapper>
  );
}

export default Album;
