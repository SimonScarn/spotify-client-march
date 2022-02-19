import styled from "styled-components";
import { Button } from "@mui/material";

const Container = styled.div`
  flex: 0.8;
  width: 100%;
  padding-bottom: 100px;
  overflow-y: auto;
  color: #fff;
  background-color: #121212;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding-top: 3em;
  padding-left: 60px;

  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 20px;
`;

const Name = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 5em;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding-left: 60px;

  

`;

const RefreshBtn = styled(Button)`
  && {
    width: 96%;
    margin-top: 1.5rem;
    padding: 0.75em 1em;
    border-radius: 10px;
    color: white;
    background: #6b0f1a;
    font-size: 18px;
    letter-spacing: 3px;
    transition: all 0.5s ease-in-out;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
      outline: 2px solid rgb(164, 109, 200);
      color: rgb(164, 109, 200);
    }
  }
`;

const Tracks = styled.div`
  margin-bottom: 3rem;
`;

const ToolbarMini = styled.div`
  display: grid;
  place-items: center;
`;

/*   .playlist__toolbar .MuiSvgIcon-root {
    margin-left: 20px;
    color: pink !important;
    font-size: 2em;
    cursor: pointer;
  }
   */

export {
  Container,
  Header,
  Details,
  Name,
  Toolbar,
  RefreshBtn,
  Tracks,
  ToolbarMini,
};
