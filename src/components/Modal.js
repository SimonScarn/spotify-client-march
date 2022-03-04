import {
  Container,
  Input,
  Body,
  ListContainer,
} from "../styles/Modal.styled.js";
import ReactDom from "react-dom";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Modal as MUIModal } from "@mui/material";
import ListItem from "./ListItem";

function Modal({ open, handleClose, songID }) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState([]);

  useEffect(() => {
    setSearchedPlaylists(sortPlaylists([...userInfo.playlists]));
  }, []);

  useEffect(() => {
    if (query === "") {
      setSearchedPlaylists(sortPlaylists([...userInfo.playlists]));
    } else {
      const items = [...userInfo.playlists].filter((e) =>
        e.name.toLowerCase().includes(query)
      );
      setSearchedPlaylists(items);
    }
  }, [query]);

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
            onChange={(e) => setQuery(e.target.value)}
          />
          <Body>
            <h2>Your playlists:</h2>
            <ListContainer>
              {searchedPlaylists?.map((item) => (
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
