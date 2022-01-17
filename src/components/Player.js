import Sidebar from "./Sidebar";
import Home from "./Home";
import Footer from "./Footer";
import Album from "./Album";
import Playlist from "./Playlist";
import Show from "./Show";
import Artist from "./Artist";
import Search from "./Search";
import Discography from "./Discography";
import Library from "./Library";
import { Switch, Route, HashRouter } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./../GlobalContext";
import { getUrlToken, spotifyAPI } from "./../spotify";
import { getUserPlaylists } from "./../utils/ApiCalls";
import useAuth from "../hooks/useAuth";
import { apiRequest } from "./../requests";


export default function Player({ code }) {
  const accessToken = useAuth(code);
  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (!accessToken) return;
    spotifyAPI.setAccessToken(accessToken);
    dispatch({ type: "SET_TOKEN", payload: accessToken });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyAPI.getMe().then((data) => {
      dispatch({ type: "SET_USER", payload: data });
    });
    spotifyAPI.getMySavedAlbums({ limit: 10 }).then((data) => {
      dispatch({ type: "SET_USER_ALBUMS", payload: data.items });
    });

    getUserPlaylists().then((data) => {
      dispatch({ type: "SET_USER_PLAYLISTS", payload: data });
    });
  }, [accessToken]);

  useEffect(() => {
    if (code !== "custom") {
      apiRequest.put("/status");
    }
  }, []);

  return (
    <HashRouter>
      <div className="player">
        <div className="player__body">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/search/:id" component={Search} />
            <Route path="/album" component={Album} />
            <Route path="/album/:id" component={Album} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/show" component={Show} />
            <Route path="/show/:id" component={Show} />
            <Route exact path="/artist" component={Artist} />
            <Route exact path="/artist/:id" component={Artist} />
            <Route
              exact
              path="/artist/:id/discography/album"
              component={Discography}
            />
            <Route exact path="/artist/:id/related" component={Discography} />
            <Route exact path="/collection" component={Library} />
            <Route exact path="/collection/:category" component={Library} />
          </Switch>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}
