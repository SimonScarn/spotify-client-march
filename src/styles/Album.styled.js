import styled from "styled-components";

const Container = styled.div`
  flex: 0.8;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: var(--bg-color);
  color: var(--info-color);
`;

const Image = styled.img`
  flex: 0.3;
  height: 90%;
  margin-right: 2rem;
  margin-top: auto;
  margin-bottom: auto;
  object-fit: contain;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 40vh;
  margin-top: 60px;
  padding: 20px 40px;
  border-bottom: 1px solid whitesmoke;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    z-index: -1;
    background-color: var(--header-color);
    transition: 0.3s ease-in;
  }

  & > div {
    flex: 0.7;
    padding: 0;
    margin: 0;
  }
`;

const ArtistInfo = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  font-style: oblique;
  color: whitesmoke;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  gap: 20px;

  & > h1 {
    margin: 0;
    padding: 0;
    font-size: 7vh;
  }
`;
const Controls = styled.div`
  .album__albumDetails > div {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    & > div {
        display: flex;
    align-items: center;
    gap: 3px;
    }
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const TracksContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 100px;
  border-top: 1px solid whitesmoke;
`;

export {
  Container,
  Image,
  Header,
  ArtistInfo,
  Title,
  AlbumInfo,
  AlbumDetails,
  Controls,
  Toolbar,
  TracksContainer,
};

/* 

  .album__toolbar .MuiSvgIcon-root {
    margin-left: 20px;
    color: pink !important;
    font-size: 40px;
    cursor: pointer;
  }

   */
