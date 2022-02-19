import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";


const Container = styled.div`
  flex: 0.8;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: overlay;
  background-color: var(--bg-color);
`

const ToggleBtn = styled(ToggleButton)`
&& {
  height: 50px;
    margin-top: 20px;
    margin-right: 15px;
    border-radius: 100px;
    color: pink;
}
  
`
const Toolbar = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 3em;
    padding-right: 3em;

    h3 {
        color: #eee;
    font-size: 30px;
    }
`

const ItemsList = styled.div`
    padding-top: 30px;
    padding-bottom: 100px;
`
const AlbumHeader = styled.div`
   display: grid;
    grid-template-columns: 200px 200px 100px;
    padding-left: 3em;
    padding-right: 3em;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    background-color: rgb(83, 82, 79);
`

const AlbumDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    p, h3 {
      padding: 0;
    margin: 0;
    }
`

const AlbumCover = styled.img`
      height: 180px;
    margin-top: auto;
    margin-bottom: auto;
`

const AlbumIcons = styled.div`
      display: flex;
    align-items: center;
    gap: 15px;
`

export {
  Container,
  ToggleBtn,
Toolbar,
ItemsList,
AlbumHeader,
AlbumDetails,
AlbumCover,
AlbumIcons,
}