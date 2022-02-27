import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const Container = styled.div`
  flex: 0.8;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: overlay;
  background: red;
`;

const ToggleBtnGroup = styled(ToggleButtonGroup)``;

const ToggleBtn = styled(ToggleButton)`
  && {
    height: 50px;
    margin-top: 20px;
    color: ${(props) => props.theme.colors.colorSecondary};
    border-radius: 100px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 10px 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid whitesmoke;

  h3 {
    color: #eee;
    font-size: 3rem;
  }
`;

const ItemsList = styled.div`
  padding: 0 20px 80px 20px;
`;

const AlbumContainer = styled.div`
  margin-bottom: 1rem;
`;

const AlbumHeader = styled.div`
  display: grid;
  grid-template-areas:
    "a b b b b b b b b b b b b b b b b"
    "c c c c c c c c c c c c c c c c c";
  padding: 20px 40px;
  border-bottom: 2px solid black;
  background-color: rgb(83, 82, 79);
`;

const AlbumDetails = styled.div`
  grid-area: b;
  display: grid;
  place-content: center start;
  gap: 10px;

  p,
  h3 {
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 2rem;
  }
`;

const AlbumCover = styled.div`
  grid-area: a;

  img {
    display: block;
    height: 250px;
    object-fit: contain;
  }
`;

const AlbumIcons = styled.div`
  grid-area: c;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 2rem;
`;

export {
  Container,
  ToggleBtnGroup,
  ToggleBtn,
  Toolbar,
  ItemsList,
  AlbumContainer,
  AlbumHeader,
  AlbumDetails,
  AlbumCover,
  AlbumIcons,
};
