import {
  Container,
  Details,
  Artists,
  Toolbar,
  Album,
  ItemLink,
  ItemImg,
  Player,
  CheckBox,
  PlayIcon,
  RemoveBtn,
  AddToPlaylistBtn,
  PlaylistShowBtn,
  Index,
} from "../styles/SongRow.styled";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import { getItemDuration, getArtists } from "../utils/ApiData";
import Modal from "./Modal";
import { Button, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";

function SongRow({
  id,
  song,
  recommended,
  playlistId,
  checkboxState,
  checkboxOnChange,
  addToPlaylist,
  removeFromPlaylist,
  setCount,
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [checked, setChecked] = useState(true);
  
   /* useEffect(() => {
    spotifyAPI.containsMySavedTracks([song.id])
      .then(res => {
        if (res[0] === false) {
          setFavorite(false);
        }
      }); 
  }, [checkboxState]);*/

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

  function handleAddToPlaylist() {
    addToPlaylist(playlistId, [song.uri], setIsAdded);
    setCount((prev) => (prev += 1));
  }

  function handleRemoveFromPlaylist() {
    removeFromPlaylist(playlistId, [song.uri]);
    setCount((prev) => (prev += 1));
  }

  function clickCheckbox(e) {
    setChecked((prev) => !prev);
  }


  if (!favorite || isAdded) return null;
  return (
    <Container>
      <Player>
        <Index>{id}</Index>
        <PlayIcon>
          <PlayArrowIcon onClick={playSong} />
        </PlayIcon>
      </Player>
      <Tooltip title={song.album.name} placement="top-start">
        <ItemImg src={song.album.images[0].url} />
      </Tooltip>
      <Details>
        <div>
          <Tooltip title={song.name} placement="top-start" >
            <h3>{song.name}</h3>
          </Tooltip>
            <Artists>{getArtists(song.artists)}</Artists>
        </div>
        <Album>
          <ItemLink to={`/album/${song.album.id}`} white>
            {song.album.name}
          </ItemLink>
        </Album>
      </Details>
      {/*-----------------------------PATHNAME = TRACKS-----------------------------*/}
      {pathname.split("/")[2] ===
        "tracks" /*  || pathname.split("/")[1] === "playlist" */ && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CheckBox
            value={checkboxState[song.id]}
            onChange={() => checkboxOnChange(song.id)}
          />
        </div>
      )}
      {recommended ? (
        <Toolbar>
          <AddToPlaylistBtn
            onClick={handleAddToPlaylist}
          >
            ADD
          </AddToPlaylistBtn>
        </Toolbar>
      ) : (
        <Toolbar>
          <Modal
            open={open}
            handleClose={hidePlaylistModal}
            songID={song.uri}
          />
            
          <PlaylistShowBtn onClick={showPlaylistModal}>
          <LibraryAddIcon
          />
          </PlaylistShowBtn>
         
          <div>
            <FavoriteIcon style={{color: "#966ea3", cursor: "pointer"}} onClick={removeFavorite} />
            <span>{() => getItemDuration(song["duration_ms"])}</span>
          </div>
        </Toolbar>
      )}
      {/*-----------------------------PATHNAME = PLAYLIST-------------------------------*/}
      {pathname.split("/")[1] === "playlist" && !recommended && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RemoveBtn onClick={handleRemoveFromPlaylist}>
            <ClearIcon />
          </RemoveBtn>
        </div>
      )}
    </Container>
  );
}

export default SongRow;
