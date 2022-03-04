import { Wrapper, Grid, HeaderTitle } from "../styles/Global.styled.js";
import { useState, useEffect, useRef, useCallback } from "react";
import { spotifyAPI } from "../spotify";
import { useParams, useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";
import SearchResult from "./SearchResult";
import FavoritesTracks from "./FavoritesTracks";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import Loader from "./Loader";

function Library() {
  const navigate = useNavigate();
  const { category } = useParams() || "playlists";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 50);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    switch (category) {
      case "artists":
        setLoading(true);
        spotifyAPI.getFollowedArtists({ offset, limit: 50 }).then((data) => {
          checkItems(data.artists.items, items, setItems);
          setLoading(false);
        });
        break;
      case "albums":
        setLoading(true);
        spotifyAPI.getMySavedAlbums({ offset, limit: 50 }).then((data) => {
          const filteredAlbums = data.items.map((e) => e.album);
          checkItems(filteredAlbums, items, setItems);
          setLoading(false);
        });
        break;
      case "shows":
        setLoading(true);
        spotifyAPI.getMySavedShows({ offset, limit: 50 }).then((data) => {
          const shows = data.items.map((e) => e.show);
          checkItems(shows, items, setItems);
          setLoading(false);
        });
        break;
      case "playlists":
        setLoading(true);
        spotifyAPI.getUserPlaylists({ offset, limit: 50 }).then((data) => {
          const playlists = data.items;
          checkItems(playlists, items, setItems);
          setLoading(false);
        });
        break;
      case "episodes":
        break;
      case "tracks":
        break;
      case undefined:
        navigate("/collection/playlists");
        break;

      default:
        break;
    }
  }, [category, offset]);

  useEffect(() => {
    setOffset(0);
    setItems([]);
  }, [category]);


  function checkItems(data, items, setItems) {

    if (items[0] === undefined) {
      setItems(data);
      return;
    }
    if (data.length === 0) {
      setItems([]);
      return;
    }

    //!artists
    if (category === "artists") {
      let last = items[offset - 1];
    }

    if (category.slice(0, -1) === items[0]?.type) {
      setItems((prev) => [...prev, ...data]);
    } else {
      setItems(data);
    }
  }

  return (
    <Wrapper>
      <TopHeader />
      {category == "tracks" ? (
        <FavoritesTracks />
      ) : category == "episodes" ? (
        <>
          <p style={{ marginLeft: "20px" }}>coming soon</p>
        </>
      ) : (
        <>
          <HeaderTitle>
            <LibraryMusic /> Your {category}
          </HeaderTitle>
          <Grid>
                 {items?.map((item, idx) => {
              if (items.length === idx + 1) {
                return (
                  <div ref={lastItemRef} style={{ gridColumn: "1 / -1" }}>
                    <Loader row />
                  </div>
                );
              } else {
                return (
                  <SearchResult key={item.id} item={item} view="collection" />
                );
              }
            })} 
          </Grid>
        </>
      )}
    </Wrapper>
  );
}

export default Library;
