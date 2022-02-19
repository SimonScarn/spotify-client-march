import "../styles/SearchResult.css";
import {
  Container,
  Image,
  Title,
  DeleteBtn,
  PlayBtn
  } from "../styles/SearchResult.styled.js";
import { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getDescription } from "../utils/ApiData";
import PlayCircleIcon from "@material-ui/icons/PlayArrow";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function SearchResult({ item, view }) {
  const [remove, setRemove] = useState(false);
  const {
    userInfo: { savedAlbums },
    dispatch,
  } = useContext(GlobalContext);
  const history = useHistory();
  const defaultImgUrl =
    "https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png";
  const prevPath = useLocation().pathname;

  const openSearchResult = (item) => {
    switch (item.type) {
      case "album":
        history.push({
          pathname: `/album/${item.id}`,
          state: {
            prevPath: prevPath,
          },
        });
        break;
      case "show":
        history.push({
          pathname: `/show/${item.id}`,
          state: {
            prevPath: prevPath,
          },
        });
        break;
      case "artist":
        history.push({
          pathname: `/artist/${item.id}`,
          state: {
            prevPath: prevPath,
          },
        });
        break;
      case "playlist":
        history.push({
          pathname: `/playlist/${item.id}`,
          state: {
            prevPath: prevPath,
          },
        });
        break;
      default:
        history.push({
          pathname: `/album/${item.id}`,
          state: {
            prevPath: prevPath,
          },
        });
        break;
    }
  };

  function playItem(e) {
    e.stopPropagation();
    dispatch({ type: "SET_CURRENT_TRACK", payload: [item.uri] });
  }

  function deleteItem(e) {
    e.stopPropagation();
    let promise;
    switch (item.type) {
      case "album":
        promise = spotifyAPI.removeFromMySavedAlbums([item.id]);
        break;
      case "playlist":
        promise = spotifyAPI.unfollowPlaylist(item.id);
        break;
      case "artist":
        promise = spotifyAPI.unfollowArtists([item.id]);
        break;
      case "show":
        promise = spotifyAPI.removeFromMySavedShows([item.id]);
        break;
    }
    promise.then(() => {
      setRemove(true);
    });
  }

  if (remove) return null;

  return (
    <Container onClick={() => openSearchResult(item)}>
      <div>
        <Image
          src={item?.images[0]?.url ? item?.images[0]?.url : defaultImgUrl}
          className={item.type == "artist" ? "artistAvatar" : null}
        />
        <Title>{item.name}</Title>
        <Title>{() => getDescription(item, view)}</Title>

        {view == "collection" && (
          <DeleteBtn onClick={deleteItem}>
            <HighlightOffIcon className="searchResult__deleteIcon" />
          </DeleteBtn>
        )}

        <PlayBtn onClick={playItem}>
          <PlayCircleIcon
            className="searchResult__playIcon"
            onClick={playItem}
          />
        </PlayBtn>
      </div>
    </Container>
  );
}

export default SearchResult;
