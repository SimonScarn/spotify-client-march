import styled from "styled-components";

const Container = styled.div`
  flex: 0.8;
  width: 100%;
  padding-bottom: 100px;
  background-color: var(--bg-color);
  overflow-y: auto;
  color: white;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 80px;
  padding: 10px 20px;

  img {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  font-style: oblique;
`;
const Publisher = styled.h2`
  font-size: 1.25rem;
`;
const Body = styled.div`
  display: flex;
  gap: 60px;
  padding: 10px 20px;

  hr {
    height: 0.5px;
  }
`;
const BodyLeft = styled.div`
  flex: 0.6;
`;

const BodyRight = styled.div`
  flex: 0.4;
`;

const BodyTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export {
  Container,
  Header,
  Title,
  Publisher,
  Body,
  BodyLeft,
  BodyRight,
  BodyTitle,
};
