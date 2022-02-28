import { PlayBtn } from "../styles/Global.styled.js";
import {
Container,
Image,
ItemLink,
Details,
} from "../styles/ItemRow.styled.js"
import { getArtists } from "../utils/ApiData";
import { Tooltip } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayArrow";
import { useState, useEffect } from "react";
import defaultImgSrc from "../assets/defaultimgsrc.png";


function Item({ item }) {
  const [isLoading, setIsLoading] = useState(true);



  function playItem(e) {
    e.preventDefault();
  }

  return (
    <ItemLink
      to={`/album/${item.album ? item.album.id : item.id}`}
    >
      <Container>
      <Tooltip title={`${item?.album?.name} (${item?.album?.['release_date'].slice(0,4)})`} placement="top">
        <Image alt="track img" src={isLoading ? defaultImgSrc : (item.album ? item.album.images[0].url : item.images[0].url)} onLoad={() => setIsLoading(false)}/>
      </Tooltip>
        <Details>
          <h2>{item.name}</h2>
          <p>{getArtists(item.artists)}</p>
        </Details>
        <PlayBtn left>
          <PlayCircleIcon />
        </PlayBtn>
      </Container>
    </ItemLink>
  );
}

export default Item;
