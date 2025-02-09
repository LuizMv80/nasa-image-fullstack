import { styled, TextField, Typography } from "@mui/material";


export const Title = styled('h1')`
    color: #3d3d3d;
    font-weight: bold;
    margin: 0;
    font-size: xx-large;
    margin: 2rem 0rem;
`;

export const Text = styled('p')`
    color: #3d3d3d;
    font-weight: bold;
    margin: 0;
    font-size: medium;
`;

export const SmallText = styled(Typography)`
    color: #3d3d3d;
    margin: 0;
    font-size: small;
    text-align: center;
    margin-bottom: 1rem;
`;

export const XSmallText = styled(SmallText)`
    font-size: x-small;
    text-align: center;
`;

export const ErrorText = styled(XSmallText)`
    color: #B22234;
    text-align: start;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const Input = styled(TextField) `
    
    border-radius: 10px;
    background-color: #4f4f4f;
    border: 2px solid transparent;
    color: #e7e7e7;
    font-weight: bold;
    
    &:focus {
        outline: none;
        border: 2px solid #888888;
    }
`;

export const Button = styled('button')`
    color: #d1d1d1;
`;
