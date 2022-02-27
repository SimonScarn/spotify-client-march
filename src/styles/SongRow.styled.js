import styled from "styled-components";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";

const RemoveBtn = styled(IconButton)`
  && {
    color: red;
    display: none;

    &:hover {
      transform: scale(1.2);
      box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.24);
    }
  }
`;

const PlaylistShowBtn = styled(IconButton)`
    && {
      visibility: hidden;
      color: whitesmoke;
    }
`

const Index = styled.div``;

const PlayIcon = styled.span`
  display: none;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 75px 6fr 0.5fr 1fr;
  position: relative;
  z-index: 1;
  width: 92%;
  margin: auto;
  margin-bottom: 2px;
  padding: 0.5em 1em;
  padding-right: 3em;
  background-image: linear-gradient(315deg, #000000 0%, #141414 74%);

  &:hover {
    background-image: linear-gradient(55deg, #000000 0%, #202020 74%);

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.05;
      z-index: -1;
      background-color: #c0a1cd;
      transition: 0.3s ease-in;
    }

    &:hover ${RemoveBtn},
    &:hover ${PlayIcon}{
      display: grid;
      place-items: center;
    }

    &:hover ${Index} {
        display: none;
  }

    &:hover ${PlaylistShowBtn} {
      visibility: visible;
    }
`;

/*    .songRow__details {
    display: flex;
    align-items: center;
    min-width: 60%;
  } 
  
  .songRow__songInfo p,
  .songRow__songInfo h3 {
    margin: 4px;
  }*/

const Details = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  & > div h3,
  & > div p {
    width: 500px;
    min-width: 200px;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
  }
`;

const Artists = styled.div`
  max-height: 30px;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;


`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-left: auto;
  margin-right: auto;

  & > div {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`;
const Album = styled.div`
  width: 200px;
  min-width: 100px;
  margin: auto 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }

  color: ${(props) => props.white && "white"};
`;

const AddToPlaylistBtn = styled.div`
&& {
  padding: 0.5em 3em;
  color: pink;
  border: 1px solid rgb(164, 109, 200);
  border-radius: 100px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
} 
`;

const ItemImg = styled.img`
  height: 50px;
  margin: auto 1rem;
`;

const Player = styled.div`
  display: grid;
  place-items: center;
`;

const CheckBox = styled(Checkbox)`
  color: white;
  width: min-content;
  margin-left: auto;
  box-shadow: rgb(164, 109, 200);
`;


export {
  Container,
  Details,
  Artists,
  Toolbar,
  Album,
  ItemLink,
  ItemImg,
  Player,
  CheckBox,
  PlayIcon,
  RemoveBtn,
  AddToPlaylistBtn,
  PlaylistShowBtn,
  Index,
};
