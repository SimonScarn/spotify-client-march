import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

const LoaderContainer = styled.div`
  display: grid;
  place-content: center;
  min-height: 75vh;
`;

const LoadingRow = styled.div`
  grid-column: 1/-1;
  display: grid;
  place-content: center;
  height: 60px;

`

const Wrapper = styled.div`
  position: relative;
  flex: 0.8;
  width: 100%;
  max-width: 80vw;
  padding-bottom: 100px;
  overflow-x: auto;
  color: #fff;
  background-color: ${(props) => props.theme.colors.bgMain};
`;

const Section = styled.div`
  padding: 10px;
`;

const Row = styled.div`
  display: grid;
  justify-content: left;
  gap: 10px;
  grid-auto-flow: column;
  grid-row: 1;
  grid-template-rows: ${(props) => props.double && "1fr 1fr"};
  height: 250px;
  padding-bottom: 30px;
  padding-right: 10px;
  overflow-y: hidden;
  overflow-x: scroll;
`;

const Grid = styled.div`
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fill, 190px);
  gap: 10px;
  padding: 20px 10px;
  border: 1px solid red;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5%;
`;

const ColorLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }

  &:nth-of-type(1n) {
    color: ${(props) => props.theme.colors.linkPrimary};
  }

  &:nth-of-type(2n) {
    color: ${(props) => props.theme.colors.linkSecondary};
  }
`;

const PlayBtn = styled(IconButton)`
  && {
    position: absolute;
    top: calc(65% - 15px);
    left: calc(50% - 15px);
    gap: 15px;
    width: 40px;
    height: 40px;
    color: black;
    background-color: ${props => props.theme.colors.linkSecondary};
    visibility: hidden;
    transform: translate(110%, -20%);
    opacity: 0.1;
    cursor: default;
    transition: 0.2s;

    &:hover {
      background-color: ${props => props.theme.colors.linkSecondary};
    }
  }
`;

export { LoaderContainer, LoadingRow, Wrapper, Section, Row, Grid, HeaderTitle, ColorLink, PlayBtn };
