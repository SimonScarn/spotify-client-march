import { useEffect, useState } from "react";
import { spotifyAPI } from "../spotify";

export default function useFavoriteTracks(offset) {
  const [loading, setLoading] = useState(true);
  const [favoritesTracks, setFavoritesTracks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log('useFAV -----HOOOK------')
    setLoading(true);
    spotifyAPI
      .getMySavedTracks({ offset })
      .then((res) => {
        if (reload === true) {
          setFavoritesTracks(res.items)
        }
        else {
          setFavoritesTracks((prev) => [...prev, ...res.items]);
        }
        setReload(false);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [offset, spotifyAPI, reload]);

  return { favoritesTracks, loading, setReload };
}
