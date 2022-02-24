import "../styles/SearchResult.css";
import { PlayBtn } from "../styles/Global.styled.js";
import {
  Container,
  Image,
  Title,
  DeleteBtn,
} from "../styles/SearchResult.styled.js";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getArtists, getDescription, getReleaseDate } from "../utils/ApiData";
import PlayCircleIcon from "@mui/icons-material/PlayArrow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import defaultImgSrc from "../assets/defaultimgsrc.png";

function SearchResult({ item, view }) {
  const [remove, setRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userInfo: { savedAlbums },
    dispatch,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const prevPath = useLocation().pathname;
  const { pathname } = useLocation();

  const openSearchResult = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const href = e.target.getAttribute("href");
    if (href !== null && href.includes("artist")) {
      return;
    }

    switch (item.type) {
      case "album":
        navigate(`/album/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "show":
        navigate(`/show/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "artist":
        navigate(`/artist/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "playlist":
        navigate(`/playlist/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      default:
        navigate(`/album/${item.id}`, {
          state: {
            prevPath: pathname,
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

  useEffect(() => {}, [item]);

  if (remove) return null;

  return (
    <Container onClick={(e) => openSearchResult(e, item)}>
      <div>
        {isLoading && <Image src={defaultImgSrc} cover />}
        <Image
          src={
            !isLoading || item?.images[0]?.url
              ? item?.images[0]?.url
              : defaultImgSrc
          }
          style={{
            display: isLoading ? "none" : "inline",
            borderRadius: item.type == "artist" && "50%",
          }}
          onLoad={() => setIsLoading(false)}
        />
        <h2>{item.name}</h2>
        {item.publisher && <h3>{item.publisher}</h3>}

        {view === "artist" ? (
          <Title>{getReleaseDate(item?.["release_date"])}</Title>
        ) : (
          <Title>{item?.artists && getArtists(item.artists)}</Title>
        )}
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
