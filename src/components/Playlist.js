import "../styles/Playlist.css";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import {
  addToPlaylist,
  getRecommendations,
  getPlaylistData,
  //!-------------
  getPlaylist,
  getPlaylistTracks,
} from "../utils/playlist";

import TopHeader from "./TopHeader";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import defaultImgSrc from "../assets/defaultimgsrc.png";

function Playlist() {
  const location = useLocation();

  const [playlist, setPlaylist] = useState();
  const [tracks, setTracks] = useState([]);
  const [randomTracks, setRandomTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  const [count, setCount] = useState(1);

  useEffect(() => {
    const playlistID = location.pathname.split("/")[2];
    setTimeout(() => {
      getPlaylistData(playlistID).then((data) => {
        setPlaylist(data.playlist);

        const newState = data.tracks.map((e, idx) => {
          return { ...e, id: idx + 1 };
        });
        setTracks(newState);
      });
    }, 1500);
  }, [location, count]);

  //? if prevTracks.length != tracks.length dont run it
  useEffect(() => {
    console.log('gettin rekoms')
    getRecommendations(tracks).then((data) => {
      setRecommendedTracks(data);
    });
  }, [location]);




  function refreshRecommendations() {
    getRecommendations(tracks).then((data) => {
      setRecommendedTracks(data);
    });
  }

  return (
    <div className="playlist">
      <TopHeader />
      <div className="playlist__header">
        <img
          alt="playlist cover"
          src={
            playlist?.images[0]?.url ? playlist?.images[0]?.url : defaultImgSrc
          }
        />
        <div>
          <p style={{ textTransform: "capitalize" }}>{playlist?.type}</p>
          <h2 className="playlist__name">{playlist?.name}</h2>
          <div className="playlist__details">
            <p>{playlist?.owner["display_name"]}</p>
            <p>
              <span>{playlist?.tracks.total}</span>{" "}
              {playlist?.tracks.total > 1 ? "tracks" : "track"}
            </p>
          </div>
        </div>
      </div>
      <div className="playlist__toolbar">
        <PlayCircleFilledIcon />
        <MoreHorizIcon />
      </div>
      <hr />
      <div className="playlist__tracks">
        {tracks
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item) => {
            return <SongRow key={item.id} id={item.id} song={item.track} />;
          })}
      </div>
      <hr />
      <h3 style={{ marginLeft: "5%", fontSize: "30px" }}>Recommended: </h3>
      <div className="playlist__recommended">
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
        <div className="playlist__recommendedToolbar">
          <Button
            className="playlist__recommendedRefreshBtn"
            onClick={refreshRecommendations}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
