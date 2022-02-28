import { Wrapper, Section, Row, ContentGrid } from "../styles/Global.styled.js";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import SearchResult from "./SearchResult";
import TopHeader from "./TopHeader";
import ItemRow from "./ItemRow";

function Home() {
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [newReleases, setNewReleases] = useState({ albums: [], singles: [] });
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    spotifyAPI
      .getMyTopArtists()
      .then((data) => {
        setTopArtists(data.items);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getMyRecentlyPlayedTracks()
      .then((data) => {
        data.items.map((e) => {});
        setRecentlyPlayed(removeDuplicates(data));
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getMyTopTracks()
      .then((data) => {
        setTopTracks(data.items);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getNewReleases()
      .then((data) => {
        const albums = data.albums.items.filter(
          (e) => e["album_type"] == "album"
        );
        const singles = data.albums.items.filter(
          (e) => e["album_type"] == "single"
        );

        setNewReleases({ ...newReleases, singles: singles, albums: albums });
      })
      .catch((err) => console.error(err));
    spotifyAPI.getFeaturedPlaylists().then((data) => {
      setFeaturedPlaylists(data.playlists.items);
    });
  }, [userInfo.token]);

  function removeDuplicates(data) {
    const items = data.items.map((e) => e.track);
    return Array.from(new Set(items.map((e) => e.id))).map((id) =>
      items.find((e) => e.id === id)
    );
  }

  return (
    <Wrapper>
      <TopHeader />
      <Section>
        <h2>Top Artists</h2>
        <Row>
          {topArtists?.map((artist) => {
            return <SearchResult key={artist.id} item={artist} view={"home"} />;
          })}
        </Row>
      </Section>
      <Section>
        <h2>Recently played</h2>
        <Row double>
          {recentlyPlayed?.map((item) => {
            return <ItemRow key={item.id} item={item} />;
          })}
        </Row>
      </Section>
      <Section>
        <h2>Your top tracks</h2>
        <Row double>
          {topTracks?.map((item) => {
            return <ItemRow key={item.id} item={item} />;
          })}
        </Row>
      </Section>
      <Section>
        <h2>New releases</h2>
        <h3>New singles</h3>
        <Row double>
          {newReleases?.singles.map((item) => {
            return <ItemRow key={item.id} item={item} />;
          })}
        </Row>
        <br />
        <h3>New albums</h3>
        <Row>
          {newReleases?.albums.map((item) => {
            return <SearchResult key={item.id} item={item} view={"home"} />;
          })}
        </Row>
      </Section>
      <Section>
        <h2>Featured playlists</h2>
        <Row>
          {featuredPlaylists?.map((item) => {
            return <SearchResult key={item.id} item={item} view={"home"} />;
          })}
        </Row>
      </Section>
    </Wrapper>
  );
}

export default Home;
