import {
  Wrapper,
  Row,
  Toolbar,
  FollowBtn,
  PlayBtn,
} from "../styles/Global.styled.js";
import { Header, ArtistInfo, Body, Section } from "../styles/Artist.styled.js";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import TopHeader from "./TopHeader";
import AlbumRow from "./AlbumRow";
import SearchResult from "./SearchResult";
import Loader from "./Loader.js";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Artist() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [popularTracks, setPopularTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [related, setRelated] = useState([]);
  const [artistID, setArtistID] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hideTracks, setHideTracks] = useState(false);


  useEffect(() => {
    setLoading(true);
  }, [pathname])

  useEffect(() => {
    setArtistID(pathname.split("/")[2]);
    document.querySelector(Wrapper).scrollTo(0, 0);
    spotifyAPI
      .getArtist(artistID)
      .then((data) => {
        setArtist(data);
        return spotifyAPI.getArtistTopTracks(artistID, "CA");
      })
      .then((data) => {
        setPopularTracks(data.tracks);
        setLoading(false);
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
      .catch((err) => console.error(err))
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
    <Wrapper>
      <TopHeader />
      {loading || (popularTracks.length === 0)? (
        <Loader />
      ) : (
        <>
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
          <Toolbar>
            <FollowBtn onClick={followArtist}>
              {isFollowing ? "UNFOLLOW" : "FOLLOW"}
            </FollowBtn>
          </Toolbar>
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
                  <Link to={"discography/album"} state={{ type: "albums" }}>
                    Show all
                  </Link>
                </Section>
                <Row>
                  {artistAlbums?.map((item) => {
                    return (
                      <SearchResult key={item.id} item={item} view="artist" />
                    );
                  })}
                </Row>
              </>
            )}
            {related?.artists?.length > 0 && (
              <>
                <Section>
                  <h2>Related</h2>
                  <Link to={"related"} state={{ type: "related" }}>
                    Show all
                  </Link>
                </Section>

                <Row>
                  {related.artists.map((item) => {
                    return <SearchResult key={item.id} item={item} />;
                  })}
                </Row>
              </>
            )}
          </Body>
        </>
      )}
    </Wrapper>
  );
}

export default Artist;
