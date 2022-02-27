import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  height: 130px;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(164, 109, 200);
    opacity: 0;
  }

  &:hover:before {
    opacity: 0.1;
  }
`;

const Image = styled.img`
  height: 100px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1rem;
`;

const EpisodeInfo = styled.div`
  max-height: 100%;
  text-overflow: ellipsis;
`;

const EpisodeDescription = styled.p`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export { Container, Image, EpisodeInfo, EpisodeDescription, Toolbar };
