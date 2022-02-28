import { LoaderContainer, Toolbar } from "../styles/Global.styled.js";
import {
  Container,
  Header,
  Details,
  Name,
  RefreshBtn,
  Tracks,
  ToolbarMini,
} from "../styles/Playlist.styled";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import {
  addToPlaylist,
  removeFromPlaylist,
  getRecommendations,
  getPlaylistData,
} from "../utils/playlist";
import TopHeader from "./TopHeader";
import SongRow from "./SongRow";
import Loader from "./Loader.js";
import defaultImgSrc from "../assets/defaultimgsrc.png";
import { IconButton } from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

function Playlist() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [initial, setInitial] = useState(false);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setInitial(true);
  });

  useEffect(() => {
    if (initial !== true) {
      setIsLoading(true);
    }
    const playlistID = location.pathname.split("/")[2];
    setTimeout(() => {
      getPlaylistData(playlistID).then((data) => {
        setPlaylist(data.playlist);
        setIsLoading(false);
        const newState = data.tracks.map((e, idx) => {
          return { ...e, id: idx + 1 };
        });
        setTracks(newState);
      });
    }, 1500);
  }, [location, count]);

  useEffect(() => {
    if (tracks && playlist) {
      refreshRecommendations(tracks);
    }
  }, [location, playlist]);

  function refreshRecommendations(tracks) {
    getRecommendations(tracks).then((data) => {
      setRecommendedTracks(data);
    });
  }

  return (
    <Container>
      <TopHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <img
              alt="playlist cover"
              src={
                playlist?.images[0]?.url
                  ? playlist?.images[0]?.url
                  : defaultImgSrc
              }
            />
            <div>
              <p style={{ textTransform: "capitalize" }}>{playlist?.type}</p>
              <Name>{playlist?.name}</Name>
              <Details>
                <p>{playlist?.owner["display_name"]}</p>
                <p>
                  <span>{playlist?.tracks.total}</span>{" "}
                  {playlist?.tracks.total > 1 ? "tracks" : "track"}
                </p>
              </Details>
            </div>
          </Header>
          <Toolbar>
            <IconButton size="large" style={{color: "white"}}><PlayCircleFilledIcon fontSize="large"/></IconButton>
          </Toolbar>
          <hr />
          <Tracks>
            {tracks
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((item) => {
                return (
                  <SongRow
                    key={item.id}
                    id={item.id}
                    song={item.track}
                    playlistId={playlist.id}
                    removeFromPlaylist={removeFromPlaylist}
                    setCount={setCount}
                  />
                );
              })}
          </Tracks>
          <hr />
          <h3 style={{ marginLeft: "20px", fontSize: "30px" }}>Recommended: </h3>
          <>
            {recommendedTracks?.map((item) => {
              return (
                <SongRow
                  key={item.id}
                  song={item}
                  recommended={true}
                  playlistId={playlist.id}
                  addToPlaylist={addToPlaylist}
                  setCount={setCount}
                />
              );
            })}
            <ToolbarMini>
              <RefreshBtn onClick={() => refreshRecommendations(tracks)}>
                Refresh
              </RefreshBtn>
            </ToolbarMini>
          </>
        </>
      )}
    </Container>
  );
}

export default Playlist;
