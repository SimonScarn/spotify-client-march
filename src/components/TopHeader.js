import {
  Container,
  NavBtn,
  UserInfo,
  Input,
  LibaryLink,
} from "../styles/TopHeader.styled";
import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function TopHeader({ changeQuery }) {
  const { userInfo, dispatch } = useContext(GlobalContext);

  const history = useHistory();
  const { state } = useLocation();
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    if (state?.prevPath) {
      setPrevPath(state.prevPath);
    }
  }, [state]);

  function goBack() {
    if (prevPath) {
      history.replace(prevPath);
    } else {
      history.goBack();
    }
  }

  return (
    <Container>
      <div>
        <NavBtn onClick={goBack}>
          <ArrowBackIosIcon />
        </NavBtn>
        <NavBtn onClick={() => history.goForward()}>
          <ArrowForwardIosIcon />
        </NavBtn>
      </div>

      {changeQuery ? (
        <Input
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search for a song etc. ..."
        />
      ) : (
        <div>
          <LibaryLink
            to="/collection/playlists"
          >
            Playlists
          </LibaryLink>
          <LibaryLink
            to="/collection/albums"
          >
            Albums
          </LibaryLink>

          <LibaryLink
            to="/collection/artists"
          >
            Artists
          </LibaryLink>
          <LibaryLink
            to="/collection/shows"
          >
            Shows
          </LibaryLink>
        </div>
      )}

      <UserInfo>
        <Avatar>{userInfo?.user?.["display_name"][0]}</Avatar>
        <h4>{userInfo?.user?.["display_name"]}</h4>
        <ArrowDropDownIcon />
      </UserInfo>
    </Container>
  );
}

export default TopHeader;
