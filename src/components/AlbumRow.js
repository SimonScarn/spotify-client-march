import {
  ArtistsContainer,
  PlaylistShowBtn,
  FavoriteBtn,
} from "../styles/Global.styled.js";
import { Index, Container, Player, Toolbar, Info, PlayIcon } from "../styles/AlbumRow.styled.js";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import { getItemDuration, getArtists } from "../utils/ApiData";
import Modal from "./Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function AlbumRow({ item, popular }) {
  const [favorite, setFavorite] = useState(false);
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [state, setState] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    spotifyAPI
      .containsMySavedTracks([item.id])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [state]);

  function addFavorite() {
    spotifyAPI
      .addToMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
      })

      .catch((err) => console.error(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
      })
      .catch((err) => console.error(err));
  }

  function showPlaylistModal() {
    setOpen(true);
  }

  function hidePlaylistModal() {
    setOpen(false);
  }

  function playItem() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else if (!isPlaying) {
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:track:${item.id}`],
      });
      setIsPlaying(true);
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    } else {
      setIsPlaying(false);
    }
  }

  return (
    <Container>
      {popular ? (
        <div>
          <img src={item.album.images[0].url} />
        </div>
      ) : (
        <Player>
          <Index>{item["track_number"]}</Index>
         <PlayIcon> {isPlaying ? (
            <PauseIcon onClick={playItem} />
          ) : (
            <PlayArrowIcon onClick={playItem} />
          )}</PlayIcon>
        </Player>
      )}
      <Info>
        <h3>{item.name}</h3>
        <ArtistsContainer>{getArtists(item.artists)}</ArtistsContainer>
      </Info>
      <Toolbar>
        <Modal open={open} handleClose={hidePlaylistModal} songID={item.uri} />
        <PlaylistShowBtn onClick={showPlaylistModal}>
          <LibraryAddIcon />
        </PlaylistShowBtn>
        <FavoriteBtn favorite={favorite}>
          {favorite ? (
            <FavoriteIcon onClick={removeFavorite} />
          ) : (
            <FavoriteBorderIcon onClick={addFavorite} />
          )}
        </FavoriteBtn>
        <span>{getItemDuration(item["duration_ms"])}</span>
        {popular && (
          <p>
            <ArrowCircleUpIcon />
            <span>{item.popularity}</span>
          </p>
        )}
      </Toolbar>
    </Container>
  );
}

export default AlbumRow;
