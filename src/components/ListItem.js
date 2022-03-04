import { Container, Image, Title } from "../styles/ListItem.styled.js";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "./../GlobalContext";

function ListItem({ item, track }) {
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
    console.log('coming soon')
/*     spotifyAPI
      .addTracksToPlaylist(item.id, [track])
      .then(data => console.log(data))
      .catch((err) => console.error(err)); */
  }

  return (
    <Container onClick={addToPlaylist}>
      <Image alt="playlist img" src={item?.images[0]?.url} />
      <div>
        <Title>{item.name}</Title>
        <p>
          <span>
            <strong>{item.tracks.total}</strong>
          </span>{" "}
          tracks
        </p>
      </div>
      <div>length</div>
    </Container>
  );
}

export default ListItem;
