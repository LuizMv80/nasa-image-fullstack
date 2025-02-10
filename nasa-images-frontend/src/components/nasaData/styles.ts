import { styled } from "@mui/material";
import { SmallText, Text, Title } from "../../styles/generalStyles";
import breakpoints from "../../styles/breakpoints";


export const ContainerImages = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    height: auto
`;

export const GridNav = styled('div')`
    background-color: black;
    padding: 15px 0;
    display: flex;
    justify-content: center;
    width: -webkit-fill-available;
`;

export const Nav = styled('nav')`
    display: flex;
    gap: 20px; /* Espacio entre enlaces */
`;

export const GridImage = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;

    width: -webkit-fill-available;

    flex-direction: column;
    overflow: visible;
  
    padding-top: 5rem;
    background-image: url('https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-bottom: 20px;
    gap: 7rem;
`;

export const GridHeader = styled('div')`
    display: flex;
    align-items: center;
    width: max-content;
    flex-direction: column;
    border: 2px solid white;
    padding: 1rem 5rem;
    transition: opacity 1.1s ease-in;

    p {
        display: inline-block;
        animation: balanceo 1.5s infinite ease-in-out alternate;
    }

    @keyframes balanceo {
        0% {
            transform: rotate(-2deg);
        }
        100% {
        transform: rotate(2deg);
        }
    }

    @media (max-width: ${breakpoints.values.sm}px) {
        padding: 1rem 2rem;
    }
`;


export const TitleHeader = styled(Title)`
    color: #d1d1d1;
    white-space: pre;
`;

export const TextHeader = styled(Text)`
    color: #d1d1d1;
`;

export const SmallTextHeader = styled(SmallText)`
    color: #d1d1d1;
    white-space: pre;
`;