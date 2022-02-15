import "../styles/SongRow.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import useFavoriteTracks from "../hooks/useFavoriteTracks";
import SongRow from "../components/SongRow";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { spotifyAPI } from "../spotify";
import useCheckedTracks from "../hooks/useCheckedTracks";

function FavoritesTracks() {
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  /*   const [updateFavorites, setUpdateFavorites] = useState(false); */
  const { favoritesTracks, loading, setReload } = useFavoriteTracks(offset);
  const [checkedTracks, setCheckedTracks] = useState([]);

  /*   const checkedTracks = useCheckedTracks(checked, song.id); */

  const observer = useRef();
  const lastTrackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    console.log("zczekowane traki : ", favoritesTracks);
  }, [favoritesTracks]);

  const checkboxOnChange = (id) => {
    console.log("addujeme", checkedTracks[id]);

    if (!checkedTracks.includes(id)) {
      setCheckedTracks((prev) => [...prev, id]);
    } else {
      console.log("usuwan");
      setCheckedTracks((prev) => [...prev].filter((e) => e !== id));
    }
  };

  function removeTracks() {
    console.log("remvovin ", checkedTracks);
    checkedTracks.forEach((e) => e);
    spotifyAPI.removeFromMySavedTracks(checkedTracks);
    setReload((prev) => !prev);
    setCheckedTracks([]);
  }
  /* 
  function removeFavorite(id) {
    isFavorite(false);
    spotifyAPI.removeFromMySavedTracks([song.id]);
  } */

  return (
    <>
       {  console.log('running')}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginLeft: "5%" }}>Your favorite tracks</h2>
        <div className="checkBox__controls" style={{ marginRight: "5%" }}>
          <IconButton onClick={removeTracks}>
            <DeleteForeverIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      <div className="section__Rows">
        {favoritesTracks?.map((item, idx) => {
          if (favoritesTracks.length === idx + 1) {
            return (
              <div ref={lastTrackRef} className="songRow">
                <p>loading...</p>
              </div>
            );
          } else {
            return (
              <SongRow
                key={item.track.id}
                song={item.track}
                isFavorite={true}
                /*       removeFavorite={removeFavorite} */
                checkboxState={checkedTracks /* [item.track.id] */}
                checkboxOnChange={checkboxOnChange}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default FavoritesTracks;
