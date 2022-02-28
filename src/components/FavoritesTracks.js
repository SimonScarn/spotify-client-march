import { useEffect, useState, useRef, useCallback } from "react";
import useFavoriteTracks from "../hooks/useFavoriteTracks";
import { spotifyAPI } from "../spotify";
import Loader from "./Loader";
import SongRow from "../components/SongRow";
import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function FavoritesTracks() {
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
    setReload(true);
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
        <h2 style={{ marginLeft: "20px" }}>Your favorite tracks</h2>
        <Tooltip
          title="Click to remove CHECKED tracks (checkbox appears on Song hover)"
          placement="left"
          style={{ marginRight: "20px" }}
        >
          <IconButton onClick={removeTracks}>
            <DeleteForeverIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
      {favoritesTracks.length == 0 ? (
        <Loader />
      ) : (
        <div>
          {favoritesTracks?.map((item, idx) => {
            if (favoritesTracks.length === idx + 1) {
              return (
                <div ref={lastTrackRef}>
                  <Loader row />
                </div>
              );
            } else {
              return (
                <SongRow
                  key={item.track.id}
                  id={idx + 1}
                  song={item.track}
                  checkboxState={checkedTracks.includes(item.track.id)}
                  checkboxOnChange={checkboxOnChange}
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
}

export default FavoritesTracks;
