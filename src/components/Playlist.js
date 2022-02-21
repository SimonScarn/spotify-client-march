import "../styles/Playlist.css";
import {LoaderContainer} from '../styles/Global.styled.js';
import {
  Container,
  Header,
  Details,
  Name,
  Toolbar,
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
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import defaultImgSrc from "../assets/defaultimgsrc.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Playlist() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState();
  const [tracks, setTracks] = useState([]);
  const [randomTracks, setRandomTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setIsLoading(true);
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

  //? if prevTracks.length != tracks.length dont run it
  useEffect(() => {
    console.log("gettin rekoms");
    getRecommendations(tracks).then((data) => {
      console.log("gettin rekoms FOR REALLLLLLLLLLLLL");

      setRecommendedTracks(data);
    });
  }, [location]);



  function refreshRecommendations() {
    getRecommendations(tracks).then((data) => {
      setRecommendedTracks(data);
    });
  }

/*   if (!playlist)
    return <div className="playlist">Loadingujemy kurwoooo zajebana</div>; */

  return (
    <Container>
      <TopHeader />
      {isLoading ? (
        <LoaderContainer>
          <Loader
            type="Audio"
            color="pink"
            height={100}
            width={100}
            timeout={3000}
          />
        </LoaderContainer>
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
            <PlayCircleFilledIcon />
            <MoreHorizIcon />
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
          <h3 style={{ marginLeft: "5%", fontSize: "30px" }}>Recommended: </h3>
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
              <RefreshBtn onClick={refreshRecommendations}>Refresh</RefreshBtn>
            </ToolbarMini>
          </>
        </>
      )}
    </Container>
  );
}

export default Playlist;
