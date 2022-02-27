import styled from "styled-components";

const Index = styled.p`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 20px 5px 30px;
  margin-bottom: 1px;
  color: whitesmoke;
/*   background-color: #000000; */
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);


  &:hover {
    cursor: pointer;
        background-image: linear-gradient(55deg, #000000 0%, #202020 74%);
/*     background-color: #301d20; */
    opacity: 0.8;
  }

   img {
    height: 50px;
    margin-top: auto;
    margin-bottom: auto;
  }

  & > span {
    flex: 0.1;
  }

  &:hover ${Index} {
    visibility: hidden;
  }
`;

const Toolbar = styled.div`
  flex: 0.2;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

const Info = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  & > p,
  & > h3 {
    margin: 4px;
  }
`;


export {
    Index,
Container,
Toolbar,
Info,
}

/*
.albumRow__playIcon {
    position: absolute ;
    top: -3px;
    left: -10px;
    visibility: hidden;
}

.albumRow:hover .albumRow__playIcon {
    visibility: visible;
}





.albumRow:hover .icon__addLibrary {
    visibility: visible;
}

.albumRow:hover .icon__favorite--remove {
    visibility: visible;
}

.albumRow:hover .icon__moreHorizon {
    visibility: visible;
} */
