import { useEffect, useState } from "react";
import { spotifyAPI } from "../spotify";

export default function useFavoriteTracks(offset) {
  const [loading, setLoading] = useState(true);
  const [favoritesTracks, setFavoritesTracks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    spotifyAPI
      .getMySavedTracks({ offset })
      .then((res) => {
        if (offset < 20) {
          setFavoritesTracks([...res.items])
        }
        else {
          setFavoritesTracks((prev) => [...prev, ...res.items]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setReload(false);
        setLoading(false);
      })
  
    }, [offset, reload]);

  return { favoritesTracks, loading, setReload, reload };
}
