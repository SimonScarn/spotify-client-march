import "../styles/SongRow.css";
import "../styles/global.css";
import { Wrapper, Grid, HeaderTitle } from "../styles/Global.styled.js";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { spotifyAPI } from "../spotify";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import TopHeader from "./TopHeader";
import SearchResult from "./SearchResult";
import FavoritesTracks from "./FavoritesTracks";
import LibraryMusic from "@mui/icons-material/LibraryMusic";

function Library() {
  const navigate = useNavigate();
  const { category } = useParams() || "playlists";
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    switch (category) {
      case "artists":
        spotifyAPI.getFollowedArtists().then((data) => {
          setItems(data.artists.items);
        });
        break;
      case "albums":
        setLoading(true);

        spotifyAPI
          .getMySavedAlbums({ offset, limit: 50 })
          .then((data) => {
            console.log(offset, "albumy: ", data);
            const filteredAlbums = data.items.map((e) => e.album);
            setItems((prev) => [...prev, filteredAlbums]);
            setLoading(false);
          })
          .then(() => setOffset((prev) => prev + 20));

        break;
      case "shows":
        spotifyAPI.getMySavedShows().then((data) => {
          setItems(data.items.map((e) => e.show));
        });
        break;
      case "playlists":
        spotifyAPI.getUserPlaylists().then((data) => {
          setItems(data.items);
        });
        break;
      case "episodes":
        spotifyAPI.getMySavedShows().then((data) => {
          console.log(data.items);
        });
        break;
      case undefined:
        navigate("/collection/playlists");
        spotifyAPI.getUserPlaylists().then((data) => {
          setItems(data.items);
        });
        break;
      default:
        break;
    }
  }, [category, offset]);

  /*   useEffect(() => {
    console.log('itiititt', items)
  }, [items]) */

  return (
    <Wrapper>
      <TopHeader />
      {category == "tracks" ? (
        <FavoritesTracks />
      ) : category == "episodes" ? (
        <>
          <p style={{ marginLeft: "5%" }}>coming soon</p>
        </>
      ) : (
        <>
          <HeaderTitle>
            <LibraryMusic /> Your {category}
          </HeaderTitle>
          <Grid>
            {items?.map((item) => {
              return (
                <SearchResult
                  key={item.id}
                  item={item}
                  view="collection"
                />
              );
            })}
          </Grid>
        </>
      )}
    </Wrapper>
  );
}

export default Library;
