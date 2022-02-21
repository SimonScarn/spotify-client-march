import "../styles/Modal.css";
import {
  Container,
Input,
Body,
ListContainer,
} from "../styles/Modal.styled.js"
import ReactDom from "react-dom";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Modal as MUIModal } from "@mui/material";
import ListItem from "./ListItem";

function Modal({ open, handleClose, songID }) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    setUserPlaylists(sortPlaylists(userInfo.playlists));
  }, []);

  function searchPlaylists(e) {
    setQuery(e.target.value);
  }

  function sortPlaylists(playlists) {
    return playlists.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <MUIModal open={open} onClose={handleClose}>
        <Container>
          <Input
            placeholder="Search playlists..."
            value={query}
            onChange={searchPlaylists}
          />
          <Body>
            <h2>Your playlists:</h2>
            <ListContainer>
              {userPlaylists?.map((item) => (
                <ListItem key={item.id} item={item} itemID={songID} />
              ))}
            </ListContainer>
          </Body>
        </Container>
      </MUIModal>
    </>,
    document.getElementById("portalPlaylists")
  );
}

export default Modal;
