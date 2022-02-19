import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IconButton } from "@mui/material";




const PlayBtn = styled(IconButton)`
  position: absolute;
    top: 70%;
    left: 85%;
    gap: 15px;
    width: 40px;
    height: 40px;
    opacity: 0.1;
    cursor: default;
    visibility: hidden;
    background-color: aquamarine;
    transform: translateX(-50%, -50%);
    transition: 0.3s;
    `

const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    position: relative;
    z-index: 1;
    width: 350px;
    height: 80%;
    padding: .5em;
    transition: 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
    opacity: 0.9;
    }

    &:hover ${PlayBtn} {
        visibility: visible;
    opacity: 1;
    transform: translateY(-100%);
    } 

    &:before {
        content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-color: #c0a1cd;
    transition: 0.3s ease-in;
    }

    &:hover:before {
    opacity: 0.4;

    }
`

const Image = styled.img`
       height: 90px;
    object-fit: contain;
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 1em;
`
const ItemLink = styled(Link)`
  text-decoration: none;
    color: inherit;
`

const Details = styled.div`
    width: 190px;


    h3,
    p {
        white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
`



export {
    PlayBtn,
Container,
Image,
ItemLink,
Details,
}