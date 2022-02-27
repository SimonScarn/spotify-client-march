import { Grid, Wrapper } from "../styles/Global.styled";
import {
  ToggleBtnGroup,
  ToggleBtn,
  Toolbar,
  ItemsList,
} from "../styles/Discography.styled.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import SearchResult from "./SearchResult";
import TopHeader from "./TopHeader";
import AlbumSection from "./AlbumSection";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

function Discography() {
  const location = useLocation();
  const [path, setPath] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [related, setRelated] = useState([]);
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    console.log("wasap hołłłł", location);

    if (location.state.type == "related") {
      spotifyAPI
        .getArtistRelatedArtists(location.pathname.split("/")[2])
        .then((data) => {
          setRelated(data.artists);
          setPath("related");
        })
        .catch((err) => console.error(err));
    } else {
      spotifyAPI
        .getArtist(location.pathname.split("/")[2])
        .then(({ name, id }) => {
          setArtistName(name);
          setPath("albums");
          return spotifyAPI.getArtistAlbums(id);
        })
        .then(({ items }) => {
          setArtistAlbums(
            items.filter((e) => e["available_markets"].includes("PL"))
          );
        })
        .catch((err) => console.error(err));
    }
  }, [location]);


  function handleAlignment(event, newAlignment) {
    if (!newAlignment) return;
    setAlignment(newAlignment);
  }

  return (
    <Wrapper>
      <TopHeader />
      {/*------------RELATED ARTISTS------------*/}
      {path == "related" && (
        <>
          <h2 style={{ marginLeft: "5%" }}>You may like</h2>
          <Grid>
            {related?.map((item) => (
              <SearchResult key={item.id} item={item} />
            ))}
          </Grid>
        </>
      )}
      {/*------------ARTIST ALBUMS------------*/}
      {path == "albums" && (
        <>
          <Toolbar>
            <h3>{artistName}</h3>
            <ToggleBtnGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              color="primary"
            >
              <ToggleBtn value="left">
                <FormatListBulletedIcon />
              </ToggleBtn>
              <ToggleBtn value="right">
                <ViewModuleIcon />
              </ToggleBtn>
            </ToggleBtnGroup>
          </Toolbar>
          {alignment == "left" && (
            <ItemsList>
              {artistAlbums?.map((album) => (
                <AlbumSection key={album.id} album={album} />
              ))}
            </ItemsList>
          )}
          {alignment == "right" && (
            <Grid>
              {artistAlbums?.map((item) => (
                <SearchResult key={item.id} item={item} view="artist"/>
              ))}
            </Grid>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Discography;
