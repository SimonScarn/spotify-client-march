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
  const [checkedTracks, setCheckedTracks] = useState([]);
  const { favoritesTracks, loading, setReload } = useFavoriteTracks(offset);


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



  const checkboxOnChange = (id) => {
    if (!checkedTracks.includes(id)) {
      setCheckedTracks((prev) => [...prev, id]);
    } else {
      setCheckedTracks((prev) => [...prev].filter((e) => e !== id));
    }
  };

  function removeTracks() {
    checkedTracks.forEach((e) => e);
    spotifyAPI.removeFromMySavedTracks(checkedTracks);
    setReload((prev) => !prev);
    setCheckedTracks([]);
  }

  return (
    <>
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
                checkboxState={checkedTracks}
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
