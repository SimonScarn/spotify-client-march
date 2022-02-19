import styled from "styled-components";

const Header = styled.div`
  height: 40vh;
  display: flex;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
`;

const ArtistInfo = styled.div`
  margin-top: auto;
  margin-left: 20px;
  padding-bottom: 20px;

  > div {
    padding: 10px;
    border-radius: 5px;
    background: lightgrey;
  }

  h1 {
    margin-bottom: 1.75rem;
    font-size: 4em;
    font-weight: 900;
  }

  span {
    padding: 0.5em;
    color: black;
    font-style: italic;
    font-weight: 700;
  }

  p {
    padding-left: 0.5em;
  }
`;

const Body = styled.div`
  padding: 10px 20px 80px 20px;
  border-top: 1px solid lightgrey;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    padding-right: 1.5em;
    text-decoration: none;
    text-transform: uppercase;
    color: grey;
    font-size: 13px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export { Header, ArtistInfo, Body, Section };
