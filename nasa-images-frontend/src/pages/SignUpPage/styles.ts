import { styled } from "@mui/material";
import { GridLogin, PageName } from "../LoginPage/styles";


export const SignUpContainer = styled('div')`
    display: flex;
    align-items: center;
    padding: 3rem;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    overflow: scroll;
    background-image: url('https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;


export const GridSignUp = styled(GridLogin)`
    width: 35rem;
`;


export const PageNameSignUp = styled(PageName)`
    color: #3d3d3d;
    margin-bottom: 1rem;
`;