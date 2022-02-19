import "../styles/ListItem.css";
import {
  Container,
Image,
Title,
} from "../styles/ListItem.styled.js"
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
    <Container onClick={addToPlaylist}>
      <Image src={item?.images[0]?.url} className="listItem__img" />
      <div>
        <Title>{item.name}</Title>
        <p>
          <span><strong>{item.tracks.total}</strong></span> tracks
        </p>
      </div>
      <div>
        length
      </div>
    </Container>
  );
}

export default ListItem;
