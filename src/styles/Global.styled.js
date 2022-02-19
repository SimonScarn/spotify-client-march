import { Link } from "react-router-dom";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: grid;
  place-content: center;
  min-height: 75vh;
`;

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

export { LoaderContainer, Wrapper, Section, Row, Grid, HeaderTitle, ColorLink };
