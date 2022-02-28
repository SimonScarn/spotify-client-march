import {
  Wrapper,
  Grid,
  HeaderTitle,
  LoadingRow,
} from "../styles/Global.styled.js";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { spotifyAPI } from "../spotify";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import TopHeader from "./TopHeader";
import SearchResult from "./SearchResult";
import FavoritesTracks from "./FavoritesTracks";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Library() {
  const navigate = useNavigate();
  const { category } = useParams() || "playlists";
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  //!--------------------------------------------------------------------------------------------------------------------------------
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
    /*  console.log("offset ", offset);
      console.log("items length : ", items.length); */
  }, [items, offset]);

  //!--------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    console.log("switchin");
    switch (category) {
      //?------------[artists]--------------------------
      case "artists":
        setLoading(true);
        spotifyAPI.getFollowedArtists({ offset, limit: 50 }).then((data) => {
          console.log("artists => ", data.artists);
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
          checkItems(data.items, items, setItems);
          setLoading(false);
        });
        break;
      case "episodes":
        spotifyAPI.getMySavedShows({ offset, limit: 50 }).then((data) => {
          /*     console.log(data.items); */
        });
        break;
      case "tracks":
        break;
      case undefined:
        navigate("/collection/playlists");
        setLoading(true);
        spotifyAPI.getUserPlaylists({ offset, limit: 50 }).then((data) => {
          checkItems(data, items, setItems);
          setLoading(false);
        });
        break;

      default:
        break;
    }
  }, [category, offset]);

  useEffect(() => {
    setOffset(0);
    setItems([]);
  }, [category]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  function checkItems(data, items, setItems) {
    if (items[0] === undefined) {
      setItems(data);
      return;
    }
    if (data.length === 0) {
      return;
    }

    //!artists
    if (category === "artists") {
      let last = items[offset - 1];
      console.log("welkom to LS : ", last);
    }

    if (category.slice(0, -1) === items[0]?.type) {
      console.log(category);
      setItems((prev) => [...prev, ...data]);
    } else {
      console.log("else", category);
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
          <p style={{ marginLeft: "5%" }}>coming soon</p>
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
                  <LoadingRow ref={lastItemRef}>
                    <Loader
                      type="Oval"
                      color="rgb(164, 109, 200)"
                      height={40}
                      width={100}
                      timeout={3000}
                    />
                  </LoadingRow>
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
