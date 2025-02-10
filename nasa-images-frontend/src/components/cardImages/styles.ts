import { styled } from '@mui/material';
import breakpoints from '../../styles/breakpoints';

export const GridCard = styled('div')`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 60%;
    margin-bottom: 1rem;
    padding: 2rem 3rem;
    background-color: rgba(209, 209, 209, 0.85);
    border-radius: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 1.3s ease-in, transform 0.3s ease-in-out;


    @media (max-width: ${breakpoints.values.sm}px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: min-content;
    }
`;
