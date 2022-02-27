import styled from "styled-components";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { PlayBtn } from "./Global.styled.js";

const Container = styled.div`
  flex: 1 1 150px;
  position: relative;
  z-index: 1;
  height: 200px;
  width: 150px;
  max-width: 150px;
  padding: 20px;
  cursor: pointer;
  object-fit: contain;

  &:hover ${PlayBtn} {
    visibility: visible;
    transform: translate(110%, -50%);
    opacity: 1;
    
  }


  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: -1;
    background-color: #c0a1cd;
    transition: 0.3s ease-in;
  }

  &:hover:before {
    opacity: 0.4;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  h2,
  h3 {
    padding: 0;
    margin: 0;
    margin-top: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h2 {
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
  }
  h3 {
    font-weight: lighter;
    font-size: 16px;
  }
`;

const Image = styled.img`
  height: 150px;
  object-fit: ${(props) => (props.cover ? "cover" : "contain")};
  margin: 0;
`;

const Title = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteBtn = styled(IconButton)`
  && {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 30px;
    height: 30px;
    cursor: default;
  }
`;

export { Container, Image, Title, DeleteBtn };

/* 
  

  .searchResult__playIcon {
    background-color: whitesmoke !important;
    border-radius: 25px !important;
    cursor: default;
  }
  
 

  
   */
