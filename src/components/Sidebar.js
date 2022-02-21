import "../styles/Sidebar.css";
import {
  Container,
  Toolbar,
  SearchSection,
  Input,
  SidebarLink,
  PlaylistContainer,
  PlaylistItem,
} from "../styles/Sidebar.styled.js";

import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { NavLink, Link } from "react-router-dom";

import SidebarOption from "./SidebarOption";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AddBox from "@mui/icons-material/AddBox";
import Favorite from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

export default function Sidebar() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortOption, setSortOption] = useState("ascending");

  useEffect(() => {
    setSearchedPlaylists(userInfo.playlists);
  }, [userInfo.playlists]);

  useEffect(() => {
    if (query == "") {
      setSearchedPlaylists(userInfo.playlists);
    } else {
      const items = [...userInfo.playlists].filter((e) =>
        e.name.toLowerCase().includes(query)
      );
      setSearchedPlaylists(items);
    }
  }, [query]);

  function addSong(e) {
    e.preventDefault();
    console.log("coming soon", e);
  }

  function togglePlaylist(e, id) {
    e.preventDefault();
    dispatch({ type: "SET_PLAYER_TRACK", payload: [`spotify:playlist:${id}`] });
    console.log(id);
  }

  /*  SidebarOption,
  Toolbar,
  Search,
  Input,
  SidebarLink,
  PlaylistContainer,
  PlaylistItem,
  Toolbar, */

  return (
    <Container>
      <SidebarLink to="/" exact={true}>
        <SidebarOption title="Home" Icon={Home} />
      </SidebarLink>
      <SidebarLink to="/search">
        <SidebarOption title="Search" Icon={Search} />
      </SidebarLink>
      <SidebarLink to="/collection">
        {" "}
        <SidebarOption title="Library" Icon={LibraryMusic} />
      </SidebarLink>
      <br />
      <SidebarLink to="/">
        <SidebarOption title="Create new playlist" Icon={AddBox} />
      </SidebarLink>
      <SidebarLink to="/collection/tracks">
        <SidebarOption title="Liked songs" Icon={Favorite} />
      </SidebarLink>
      <SidebarLink to="/collection/episodes">
        <SidebarOption title="My episodes" Icon={EqualizerIcon} />
      </SidebarLink>
      <hr />

      <SearchSection>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for a playlist..."
        ></Input>
      </SearchSection>
      <PlaylistContainer>
        {searchedPlaylists &&
          searchedPlaylists.map((playlist) => {
            return (
              <SidebarLink
                to={`/playlist/${playlist.id}`}
              >
                <PlaylistItem key={playlist.id}>
                  <p style={{ margin: "0", padding: "0" }}>{playlist.name}</p>
                  <Toolbar>
                    <AddIcon className="icon__sidebar" onClick={addSong} />

                    <PlayArrowIcon
                      className="icon__sidebar"
                      onClick={(e) => togglePlaylist(e, playlist.id)}
                    />
                  </Toolbar>
                </PlaylistItem>
              </SidebarLink>
            );
          })}
      </PlaylistContainer>
    </Container>
  );
}
