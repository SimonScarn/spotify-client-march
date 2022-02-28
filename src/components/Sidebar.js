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
import SidebarOption from "./SidebarOption";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AddBox from "@mui/icons-material/AddBox";
import Favorite from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from "@mui/material";
import { getUserPlaylists } from "../utils/ApiCalls.js";

export default function Sidebar() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState([]);

  useEffect(() => {
    console.log('wehighgh : ', query, searchedPlaylists)
  }, [searchedPlaylists, query])

  useEffect(() => {
    setSearchedPlaylists([...userInfo.playlists]);
  }, [userInfo.playlists]);

   useEffect(() => {
    if (query === "") {
      setSearchedPlaylists([...userInfo.playlists]);
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
  }

  function refetchPlaylists() {
    console.log(userInfo.playlists[0].name)
    setSearchedPlaylists([...userInfo.playlists]);
    setQuery("");

  }


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
      <SidebarLink to="/playlist/3oowhb3CpyJ2a2317TZeYp">
        <SidebarOption title="Create new playlist" Icon={AddBox} />
      </SidebarLink>
      <SidebarLink to="/collection/tracks">
        <SidebarOption title="Liked songs" Icon={Favorite} />
      </SidebarLink>
      <SidebarLink to="/collection/episodes">
        <SidebarOption title="My episodes" Icon={EqualizerIcon} />
      </SidebarLink>

      <SearchSection>
        <IconButton style={{color: "white"}} onClick={refetchPlaylists}>
          <CachedIcon/>
        </IconButton>
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
                  <p>{playlist.name}</p>
                  <Toolbar>
                    <AddIcon />
                    <PlayArrowIcon
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
