import React, { useEffect } from "react";
import { spotifyAPI } from "../spotify";

export default function CategoryItem({ category }) {
  useEffect(() => {
    spotifyAPI
      .getCategoryPlaylists(category.id)
      .catch((err) => console.error(err));
  }, []);

  return <div>{category.id}</div>;
}
