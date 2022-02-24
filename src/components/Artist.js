import "../styles/Artist.css";
import { Header, ArtistInfo, Body, Section } from "../styles/Artist.styled.js";

import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import TopHeader from "./TopHeader";
import AlbumRow from "./AlbumRow";
import SearchResult from "./SearchResult";
import { Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Artist() {
  const [artist, setArtist] = useState(null);
  const [popularTracks, setPopularTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [related, setRelated] = useState([]);
  const { pathname } = useLocation();
  const [artistID, setArtistID] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hideTracks, setHideTracks] = useState(false);

  useEffect(() => {
    document.querySelector(".bodyContainer").scrollTo(0, 0);
    setArtistID(pathname.split("/")[2]);

    spotifyAPI
      .getArtist(artistID)
      .then((data) => {
        setArtist(data);
        return spotifyAPI.getArtistTopTracks(artistID, "CA");
      })
      .then((data) => {
        setPopularTracks(data.tracks);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getArtistAlbums(artistID, {
        limit: 50,
        include_groups: "album",
        market: "PL",
      })
      .then((res) => {
        const unique = [];
        let filtered = res.items.filter((e) => {
          if (!unique.some((i) => i.name == e.name)) {
            unique.push(e);
          }
        });
        setArtistAlbums(unique);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getArtistRelatedArtists(artistID)
      .then((data) => {
        setRelated(data);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .isFollowingArtists([artistID])
      .then((data) => setIsFollowing(data[0]))
      .catch((err) => console.error(err));
  }, [artistID, pathname]);

  function followArtist() {
    spotifyAPI.isFollowingArtists([artist.id]).then((data) => {
      if (data[0]) {
        setIsFollowing(false);
        return spotifyAPI.unfollowArtists([artist.id]);
      }
      setIsFollowing(true);
      return spotifyAPI.followArtists([artist.id]);
    });
  }

  function toggleTracks() {
    setHideTracks((prev) => !prev);
  }

  return (
    <div className="bodyContainer">
      <TopHeader />
      <Header>
        <ArtistInfo>
          <h1>{artist?.name}</h1>
          <div>
            {artist?.genres.map((e) => {
              return <span>#{e}</span>;
            })}
          </div>
          <p>{artist?.followers.total} followers</p>
        </ArtistInfo>
      </Header>
      <div className="view__toolbar">
        <PlayCircleFilledIcon className="playBtn" />
        <Button className="followBtn" onClick={followArtist}>
          {isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </Button>
        <MoreHorizIcon />
      </div>
      <Body>
        <div>
          <div style={{ display: "flex" }}>
            <h2>Popular</h2>
            <IconButton onClick={toggleTracks}>
              <ArrowDropDownIcon style={{ color: "whitesmoke" }} />
            </IconButton>
          </div>
          {!hideTracks &&
            popularTracks?.map((item) => {
              return <AlbumRow item={item} key={item.id} popular={true} />;
            })}
        </div>
        <hr />
        {artistAlbums?.length > 0 && (
          <>
            <Section>
              <h2>Albums by {artist?.name}</h2>
              <Link
                to={{
                  pathname: `${artistID}/discography/album`,
                  state: { type: "albums" },
                }}
              >
                Show all
              </Link>
            </Section>
            <div className="contentRow">
              {artistAlbums?.map((item) => {
                return <SearchResult key={item.id} item={item} view="artist" />;
              })}
            </div>
          </>
        )}
        {related?.artists?.length > 0 && (
          <>
            <Section>
              <h2>Related</h2>
              <Link
                to={{
                  pathname: `${artistID}/related`,
                  state: { type: "related" },
                }}
              >
                Show all
              </Link>
            </Section>

            <div className="contentRow">
              {related.artists.map((item) => {
                return <SearchResult key={item.id} item={item} />;
              })}
            </div>
          </>
        )}
      </Body>
    </div>
  );
}

export default Artist;
