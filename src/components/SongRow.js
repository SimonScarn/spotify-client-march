import { PlaylistShowBtn, FavoriteBtn } from "../styles/Global.styled.js";
import {
  Container,
  Details,
  Toolbar,
  Album,
  ItemLink,
  ItemImg,
  Player,
  CheckBox,
  PlayIcon,
  RemoveBtn,
  AddToPlaylistBtn,
  Index,
} from "../styles/SongRow.styled.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import { getItemDuration, getArtists } from "../utils/ApiData";
import Modal from "./Modal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import { ArtistsContainer } from "../styles/Global.styled";

function SongRow({
  id,
  song,
  recommended,
  isFavorite,
  playlistId,
  checkboxState,
  checkboxOnChange,
  addToPlaylist,
  removeFromPlaylist,
  setCount,
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isFavorite === true) {
      console.log("checking .... ", isFavorite, song.name);
    }
    setFavorite(isFavorite);
  }, []);
  /*   useEffect(() => {
    spotifyAPI.containsMySavedTracks([song.id]).then((res) => {
      if (res[0] === true) {
        setFavorite(true);
      }
    });
  }, [checkboxState]); */

  function showPlaylistModal() {
    setOpen(true);
  }

  function hidePlaylistModal() {
    setOpen(false);
  }

  function playSong() {
    console.log("playing...");
  }

  function removeFavorite() {
    setFavorite(false);
    spotifyAPI.removeFromMySavedTracks([song.id]);
  }

  //! ???
  function handleAddToPlaylist() {
    addToPlaylist(playlistId, [song.uri], setIsAdded);
    setCount((prev) => (prev += 1));
  }

  function handleRemoveFromPlaylist() {
    removeFromPlaylist(playlistId, [song.uri]);
    setCount((prev) => (prev += 1));
  }

  if (isAdded) return null;

  return (
    <Container>
      <Player>
        <Index>{id}</Index>
        <PlayIcon>
          <PlayArrowIcon onClick={playSong} />
        </PlayIcon>
      </Player>
      <Tooltip
        title={`${song.album.name} (${song?.album?.["release_date"].slice(
          0,
          4
        )})`}
        placement="top-start"
      >
        <ItemImg src={song.album.images[0].url} />
      </Tooltip>
      <Details>
        <div>
          <h3>{song.name}</h3>
          <ArtistsContainer>{getArtists(song.artists)}</ArtistsContainer>
        </div>
        <Album>
          <ItemLink to={`/album/${song.album.id}`} white>
            {song.album.name}
          </ItemLink>
        </Album>
      </Details>
      {/*-----------------------------PATHNAME = TRACKS-----------------------------*/}
      {recommended ? (
        <Toolbar>
          <AddToPlaylistBtn onClick={handleAddToPlaylist}>ADD</AddToPlaylistBtn>
        </Toolbar>
      ) : (
        <>
          <Toolbar>
            {pathname.split("/")[2] ===
              "tracks" /*  || pathname.split("/")[1] === "playlist" */ && (
              <CheckBox
                value={checkboxState}
                onChange={() => checkboxOnChange(song.id)}
                color="error"
              />
            )}
            <Modal
              open={open}
              handleClose={hidePlaylistModal}
              songID={song.uri}
            />
            <PlaylistShowBtn onClick={showPlaylistModal}>
              <LibraryAddIcon />
            </PlaylistShowBtn>
            <FavoriteBtn favorite={favorite}>
              {favorite ? (
                <FavoriteIcon onClick={removeFavorite} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </FavoriteBtn>
            {/*-----------------------------PATHNAME = PLAYLIST-------------------------------*/}
            {pathname.split("/")[1] === "playlist" && !recommended && (
              <RemoveBtn onClick={handleRemoveFromPlaylist} size="small">
                <ClearIcon />
              </RemoveBtn>
            )}
          </Toolbar>
          <span style={{ display: "grid", placeContent: "center" }}>
            {getItemDuration(song["duration_ms"])}
          </span>
        </>
      )}
    </Container>
  );
}

export default SongRow;
