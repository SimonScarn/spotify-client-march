import styled from "styled-components";
import { PlaylistShowBtn, FavoriteBtn } from "./Global.styled.js";

const PlayIcon = styled.span`
  display: none;
`;

const Player = styled.div`
  display: grid;
  place-items: center;
  width: 25px;
`;

const Index = styled.div`
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1px;
  padding: 5px 20px 5px 30px;
  color: whitesmoke;
  /*   background-color: #000000; */
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(55deg, #000000 0%, #202020 74%);
    /*     background-color: #301d20; */
    opacity: 0.8;
  }

  img {
    height: 50px;
    margin-top: auto;
    margin-bottom: auto;
  }

  & > span {
    flex: 0.1;
  }

  &:hover ${PlaylistShowBtn}, &:hover ${FavoriteBtn} {
    visibility: visible;
  }

  &:hover ${PlayIcon} {
    display: grid;
    place-items: center;
  }
  
  &:hover ${Index} {
    display: none;
  }
`;

const Toolbar = styled.div`
  flex: 0.2;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

const Info = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  & > p,
  & > h3 {
    margin: 4px;
  }
`;

export { Index, Container, Player, Toolbar, Info, PlayIcon };
