import { useState, useEffect } from "react";

const useCheckedTracks = (value, id) => {
  const [checkedTracks, setCheckedTracks] = useState([]);

  useEffect(() => {

    console.log(value, id);
    if (value) {
      setCheckedTracks((prev) => [...prev, id]);
    } else {
      setCheckedTracks((prev) => [...prev].filter((e) => e !== id));
    }
  }, [value]);

  useEffect(() => {
    console.log("tarki :", checkedTracks);
    if (checkedTracks.length === 0) {
        console.log('noji chuj')
    }
  }, [checkedTracks]);

  return checkedTracks;
};

export default useCheckedTracks;
