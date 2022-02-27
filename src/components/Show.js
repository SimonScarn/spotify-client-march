import { FollowBtn } from "../styles/Global.styled.js";
import {
  Container,
  Header,
  Toolbar,
  Title,
  Publisher,
  Body,
  BodyLeft,
  BodyRight,
  BodyTitle,
} from "../styles/Show.styled.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { spotifyAPI } from "../spotify";
import ShowRow from "./ShowRow";
import TopHeader from "./TopHeader";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";

function Show() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const showID = pathname.split("/")[2];

  useEffect(() => {
    spotifyAPI
      .getShow(showID)
      .then((data) => {
        setShow(data);
        return spotifyAPI.containsMySavedShows([showID]);
      })
      .then((data) => setIsFollowing(data[0]))
      .catch((err) => console.error(err));
  }, []);

  function followShow() {
    spotifyAPI.containsMySavedShows([showID]).then((data) => {
      if (data[0]) {
        setIsFollowing(false);
        return spotifyAPI.removeFromMySavedShows([showID]);
      }
      setIsFollowing(true);
      return spotifyAPI.addToMySavedShows([showID]);
    });
  }

  return (
    <Container>
      <TopHeader />
      <Header>
        <div>
          <img alt="show cover" src={show?.images[1].url} />
        </div>
        <div>
          <p style={{ textTransform: "uppercase" }}>{show?.type}</p>
          <Title>{show?.name}</Title>
          <Publisher>{show?.publisher}</Publisher>
          <p>{show?.["total_episodes"]} episodes</p>
        </div>
      </Header>
      <Toolbar>
        <FollowBtn onClick={followShow}>
          {isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </FollowBtn>
        <MoreHorizIcon />
      </Toolbar>
      <Body>
        <BodyLeft>
          <BodyTitle>All episodes</BodyTitle>
          <hr />
          <div>
            {show?.episodes.items.map((item) => {
              return <ShowRow key={item.id} item={item} />;
            })}
          </div>
        </BodyLeft>
        <BodyRight>
          <BodyTitle>About</BodyTitle>
          <p>{show?.description}</p>
        </BodyRight>
      </Body>
    </Container>
  );
}

export default Show;
