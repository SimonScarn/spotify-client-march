import "../styles/Item.css";
import "../styles/global.css";
import {
Container,
Image,
ItemLink,
Details,
PlayBtn,
} from "../styles/Item.styled.js"
import { getArtists } from "../utils/ApiData";
import PlayCircleIcon from "@mui/icons-material/PlayArrow";

function Item({ item }) {
  function playItem(e) {
    e.preventDefault();
  }


  return (
    <ItemLink
      to={`/album/${item.album ? item.album.id : item.id}`}
    >
      <Container>
        <Image src={item.album ? item.album.images[0].url : item.images[0].url} />
        <Details>
          <h2>{item.name}</h2>
          <p>{getArtists(item.artists)}</p>
        </Details>
        <PlayBtn>
          <PlayCircleIcon className="item__playIcon" />
        </PlayBtn>
      </Container>
    </ItemLink>
  );
}

export default Item;
