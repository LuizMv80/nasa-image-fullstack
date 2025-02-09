import { styled } from "@mui/material";
import breakpoints from "../../styles/breakpoints";


export const GridContent = styled('div')`
    display: flex;
    align-items: center;
    padding-top: 3rem;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    overflow: hidden;
    background-image: url('https://images.pexels.com/photos/7166814/pexels-photo-7166814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;


export const GridLogin = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 25rem;
    padding: 2rem 3rem 5rem 3rem;
    background-color: rgba(209, 209, 209, 0.85);
    border-radius: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 1s ease-in;

    @media (max-width: ${breakpoints.values.sm}px) {
        justify-content: center;
        align-items: center;
    }

    @media (min-width: ${breakpoints.values.sm +
        1}px) and (max-width: ${breakpoints.values.md}px) {
        justify-content: center;
    }
`;


export const PageName = styled('h1')`
    color: #b0b0b0;
    font-weight: bold;
    font-size: small;
    margin: 1rem 0rem 0rem 0rem;
    opacity: 0;
    white-space: pre;
    transition: opacity 1.1s ease-in;
    margin-bottom: 1rem;
`;
