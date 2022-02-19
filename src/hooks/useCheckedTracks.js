import { useState, useEffect } from "react";
import { spotifyAPI } from "../spotify";

const useCheckedTracks = (value, id) => {
  const [checkedTracks, setCheckedTracks] = useState([]);

  useEffect(() => {


    if (value) {
      setCheckedTracks((prev) => [...prev, id]);
    } else {
      setCheckedTracks((prev) => [...prev].filter((e) => e !== id));
    }
  }, [value]);

  function removeTracks() {
    checkedTracks.forEach((e) => e);
    spotifyAPI.removeFromMySavedTracks(checkedTracks);
    setCheckedTracks([]);
  }


  return checkedTracks;
};



export default useCheckedTracks;
