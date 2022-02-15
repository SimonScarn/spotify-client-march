import "../styles/ListItem.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "./../GlobalContext";

function ListItem({ item, itemID }) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  function hidePlaylistModal() {
    setOpen(false);
  }

  function showTracksModal(e) {
    e.stopPropagation();
    setOpen(true);
  }

  function addToPlaylist() {
    console.log("coming soon with server", item.id, "tracki :", itemID);
    /*
 axios.post("/playlist", {
      refreshToken: userInfo.accessToken
    })
    .then(res => console.log('res from serwa: ', res))
*/
/* 
    spotifyAPI
      .addTracksToPlaylist("0XzyX3lmmcEpFRI9m7MAUs", [
        "spotify:track:0iVh9CMOrKNobLkwHaxHCK",
      ])

      .then(() => {
        console.log("coming soon with server");
      })
      .catch((err) => console.error(err)); */
  }

  return (
    <div className="listItem" onClick={addToPlaylist}>
      <img src={item?.images[0]?.url} className="listItem__img" />
      <p className="listItem__name">{item.name}</p>
      <p>
        <span> {item.tracks.total} </span>tracks
      </p>
    </div>
  );
}

export default ListItem;
